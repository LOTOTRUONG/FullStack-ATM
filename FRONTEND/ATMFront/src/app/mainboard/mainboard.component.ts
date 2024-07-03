import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../login/authentification/AuthService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mainboard',
  templateUrl: './mainboard.component.html',
  styleUrl: './mainboard.component.scss'
})
export class MainboardComponent implements OnInit {
  loggedUser: any;



  constructor(private authService: AuthService,
    private router: Router){
  
  }

  ngOnInit(): void {
    this.authService.getCurrentAccount().subscribe((response) =>{
      console.log(response);
      this.loggedUser = response;
    }) 
  }
  navigateToBalance() : void {
    this.router.navigate(['mainboard/balance']);
  }
  onLogOff(){
    this.authService.logout();
  }

  navigateToWithdraw() : void{
    this.router.navigate(['mainboard/withdraw']);

  }

  navigateToDeposite() : void{
    this.router.navigate(['mainboard/deposite']);

  }
}
