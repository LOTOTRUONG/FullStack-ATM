import {HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './authentification/AuthService';
import { NotificationDialogComponent } from '../service/notification-dialog/notification-dialog.component';
import { PincodeDialogComponent } from './pincode-dialog/pincode-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  showScreen1: boolean = true;
  showScreen2: boolean = false;
  showScreen3: boolean = false;
  registerForm !: FormGroup;
  loginForm !: FormGroup;
  constructor(private authService:AuthService, private fb:FormBuilder, private  router:Router, private http:HttpClient, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
    });

    setTimeout(() => {
      this.showScreen1 = false;
      this.showScreen2 = true;
    }, 10000);

    setTimeout(() => {
      this.showScreen2 = false;
      this.showScreen3 = true;
    }, 25000);
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const login = this.loginForm.value.login;
    this.authService.findAccount({ number: login }).subscribe((response:any) =>{
      console.log(response);
      this.openPincodeDialog(login);
    }, (error) => {
      console.error(error);
      if (error.status === 404 && error.error === 'Account not found') {
        this.dialog.open(NotificationDialogComponent, {
          data: { message: 'Account not found' }
        });
      }
    }
  )
  }

  openPincodeDialog(login: string) {
    this.dialog.open(PincodeDialogComponent, {
      data: {login: login }
    });
  }




}

