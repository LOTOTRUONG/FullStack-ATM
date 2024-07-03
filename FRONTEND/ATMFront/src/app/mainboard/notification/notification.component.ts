import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../login/authentification/AuthService';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  balance !: number;
  name !: string;
  accountNumber !: string;
  currentDate !: string;
  nameTransaction !: string;
  amountTransaction !: string;

  constructor(private router : Router,
    public dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog : MatDialog,
    private datePipe : DatePipe,
    private authservice:AuthService,

  ) {}

  ngOnInit(): void {
    this.getAccountDetail();
    this.getCurrentDate();
    this.nameTransaction = this.data.nameTransaction || '';
    this.amountTransaction = this.data.amountTransaction || '';

  }

  getAccountDetail() {
    this.authservice.getCurrentAccount().subscribe(
      (data) => {
        this.balance = data.balanceAmount; 
        this.name = data.nameClient;
        this.accountNumber = data.accountNumber;
      },
      (error) => {
        console.error('Error fetching account details:', error);
      }
    );
  }

  getCurrentDate() {
    const now = new Date();
    const formattedDate = this.datePipe.transform(now, 'HH:mm:ss dd/MM/yyyy');
    this.currentDate = formattedDate || '';

  }

  getJwtToken(): string {
    return localStorage.getItem('JWT_TOKEN') || ''; 
  }

  onBackToHomePage() : void {
    this.router.navigate(['/mainboard']); 
    this.dialog.closeAll();
  }

  onBack(){
    this.dialog.closeAll();
  }
  printPage(){
    window.print();
  }
}
