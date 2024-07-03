import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OperationService } from '../../../service/OperationService';
import { AuthService } from '../../../login/authentification/AuthService';
import { NotificationDialogComponent } from '../../../service/notification-dialog/notification-dialog.component';
import { ConfirmDialogComponent } from '../../../service/confirm-dialog/confirm-dialog.component';
import { jwtDecode } from 'jwt-decode';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-other-deposite',
  templateUrl: './other-deposite.component.html',
  styleUrl: './other-deposite.component.scss'
})
export class OtherDepositeComponent implements OnInit {
  inputValue: string = '';
  balance !: number;
  isLoading = false;
  isPresent = true;

  constructor( private dialogRef : MatDialogRef<OtherDepositeComponent>,
    private router:Router,
    private dialog:MatDialog,
    private operationSerivce : OperationService,
    private authService : AuthService
  ){}

  ngOnInit(): void {
  }

  appendToInput(value: string) {
    this.inputValue += value;
  }

  removeFromInput() {
    this.inputValue = this.inputValue.slice(0, -1);
  }

  confirmDeposite(): void {
    const amount = parseFloat(this.inputValue);

    const dialogRef2 = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to deposite this amount?' }
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result) {
        this.deposite(amount);
      }
    });
  }

  deposite(amount: number): void {
    const token = this.getJwtToken();
    const decodedToken : any = jwtDecode(token);
    const idAccount = decodedToken.sub;
    this.isLoading = true; 
    this.isPresent = false;
    this.operationSerivce.deposite(idAccount, amount).subscribe(
      response => {
        console.log('Deposite successful:', response);
        setTimeout(() => {
          this.isLoading = false;
          this.isPresent = true; 
          this.dialog.open(NotificationComponent, {
            data: {nameTransaction: 'DEPOSITED AMOUNT', amountTransaction: amount.toString()}
          });
         }, 5000);      
        },
      error => {
        console.error('Error during deposite:', error);
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


