import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperationService } from '../../service/OperationService';
import { ConfirmDialogComponent } from '../../service/confirm-dialog/confirm-dialog.component';
import { jwtDecode } from 'jwt-decode';
import { NotificationComponent } from '../notification/notification.component';
import { Router } from '@angular/router';
import { AuthService } from '../../login/authentification/AuthService';
import { OtherDepositeComponent } from './other-deposite/other-deposite.component';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrl: './deposite.component.scss'
})
export class DepositeComponent implements OnInit {

  balance !: number;
  isLoading = false;
  isPresent = true;

 constructor(
   private dialog : MatDialog,
   private operationService : OperationService,
   private router : Router,
   private authservice : AuthService,
 ) {}

 ngOnInit(): void {
 }

 confirmDeposite(amount: number): void {
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
   this.operationService.deposite(idAccount, amount).subscribe(
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
 openOtherAmount(){
  this.dialog.open(OtherDepositeComponent, {
  });
}

 getJwtToken(): string {
   return localStorage.getItem('JWT_TOKEN') || ''; 
 }

 onClose(): void {
   this.router.navigate(['mainboard']);
   setTimeout(() => {
    window.location.reload();
  }, 1);
 }

 onLogOff(){
  this.authservice.logout();
}
}

