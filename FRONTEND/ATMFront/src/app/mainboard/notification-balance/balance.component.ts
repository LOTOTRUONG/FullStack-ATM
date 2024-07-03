import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/authentification/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  balance !: number;

  constructor(
    private router: Router,
    private authservice : AuthService
  ) {}

  ngOnInit(): void {
    this.getAccountBalance();
  }

  getAccountBalance() {
    this.authservice.getCurrentAccount().subscribe(
      (data) => {
        this.balance = data.balanceAmount; 
      },
      (error) => {
        console.error('Error fetching account details:', error);
      }
    );
  }

  getJwtToken(): string {
    return localStorage.getItem('JWT_TOKEN') || ''; 
  }

  printPage(){
    window.print();
  }

  onClose(): void {
    this.router.navigate(['mainboard']);
  }

  onLogOut():void {
    this.authservice.logout();
  }
}
