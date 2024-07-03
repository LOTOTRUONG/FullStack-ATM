import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OperationService } from '../../../service/OperationService';
import { jwtDecode } from 'jwt-decode';
import { ConfirmDialogComponent } from '../../../service/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from '../../notification/notification.component';
import { NotificationDialogComponent } from '../../../service/notification-dialog/notification-dialog.component';
import { AuthService } from '../../../login/authentification/AuthService';

@Component({
  selector: 'app-other-amount',
  templateUrl: './other-amount.component.html',
  styleUrl: './other-amount.component.scss'
})
export class OtherAmountComponent implements OnInit {
  inputValue: string = '';
  balance !: number;
  isLoading = false;
  isPresent = true;

  constructor( private dialogRef : MatDialogRef<OtherAmountComponent>,
    private router:Router,
    private dialog:MatDialog,
    private operationSerivce : OperationService,
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.fetchUserBalance();
  }

  fetchUserBalance(): void {
    this.authService.getCurrentAccount().subscribe(
      (data) => {
        this.balance = data.balanceAmount;
      },
      error => {
        console.error('Error fetching balance:', error);
      }
    );
  }


  appendToInput(value: string) {
    this.inputValue += value;
  }

  removeFromInput() {
    this.inputValue = this.inputValue.slice(0, -1);
  }

  confirmWithdraw(): void {
    const amount = parseFloat(this.inputValue);

    if (amount % 10 !== 0) {
      this.dialog.open(NotificationDialogComponent, {
        data: { message: 'Amount must be a multiple of 10' }
      });
      return;
    }

    if (amount > this.balance) {
      this.dialog.open(NotificationDialogComponent, {
        data: { message: 'Insufficient balance.' }
      });
      return;
    }

    const dialogRef2 = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to withdraw this amount?' }
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result) {
        this.withdraw(amount);
      }
    });
  }

  withdraw(amount: number): void {
    const token = this.getJwtToken();
    const decodedToken : any = jwtDecode(token);
    const idAccount = decodedToken.sub;
    this.isLoading = true; 
    this.isPresent = false;
    this.operationSerivce.withdraw(idAccount, amount).subscribe(
      response => {
        console.log('Withdraw successful:', response);
        setTimeout(() => {
          this.isLoading = false;
          this.isPresent = true; 
          this.dialog.open(NotificationComponent, {
            data: {nameTransaction: 'WITHDRAWN AMOUNT', amountTransaction: amount}
          });
        }, 5000);    
        },
      error => {
        console.error('Error during withdrawal:', error);
      }
    );
  }

  onCancel(){
    this.inputValue = '';
  }

  onMainBoard(){
    this.dialogRef.close();
    this.router.navigate(["mainboard"]);
  }

  getJwtToken(): string {
    return localStorage.getItem('JWT_TOKEN') || ''; 
  }

  onCloseDialog(){
    this.dialogRef.close();
  }}

