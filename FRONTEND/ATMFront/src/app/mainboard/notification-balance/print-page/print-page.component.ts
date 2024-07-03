import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../login/authentification/AuthService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrl: './print-page.component.css'
})
export class PrintPageComponent implements OnInit {

  balance !: number;
  name !: string;
  accountNumber !: string;
  currentDate !: string;

  constructor(
    private authservice:AuthService,
    private datePipe : DatePipe
  ) { }

  ngOnInit() {
    this.getAccountDetail();
    this.getCurrentDate();
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

}
