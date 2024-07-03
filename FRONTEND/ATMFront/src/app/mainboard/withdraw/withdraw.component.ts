import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperationService } from '../../service/OperationService';
import { jwtDecode } from 'jwt-decode';
import { ConfirmDialogComponent } from '../../service/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from '../notification/notification.component';
import { Router } from '@angular/router';
import { AuthService } from '../../login/authentification/AuthService';
import { OtherAmountComponent } from './other-amount/other-amount.component';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent implements OnInit {

   balance !: number;
   isLoading = false;
   isPresent = true;

  constructor(
    private dialog : MatDialog,
    private operationService : OperationService,
    private router: Router,
    private authservice : AuthService
  ) {}

  ngOnInit(): void {
  }

  confirmWithdraw(amount: number): void {
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
    this.operationService.withdraw(idAccount, amount).subscribe(
      response => {
        console.log('Withdraw successful:', response);
        setTimeout(() => {
          this.isLoading = false;
          this.isPresent = true; 
          this.dialog.open(NotificationComponent, {
          data: {nameTransaction: 'DEPOSITED AMOUNT', amountTransaction: amount.toString()}
          });
        }, 5000); 
        },
      error => {
        console.error('Error during withdrawal:', error);
      }
    );
  }

  openOtherAmount(){
    this.dialog.open(OtherAmountComponent, {
    });
  }

  getJwtToken(): string {
    return localStorage.getItem('JWT_TOKEN') || ''; 
  }

  onClose(): void {
    this.router.navigate(['mainboard']);
  }

  onLogOff(){
    this.authservice.logout();
  }

}
