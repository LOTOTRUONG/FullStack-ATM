import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {AppRoutingModule} from "./app-routing.module"; // Import RouterModule for routing
import { LoginComponent } from './login/login.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ConfirmDialogComponent } from './service/confirm-dialog/confirm-dialog.component';
import { NotificationDialogComponent } from './service/notification-dialog/notification-dialog.component';
import { PincodeDialogComponent } from './login/pincode-dialog/pincode-dialog.component';
import { MainboardComponent } from './mainboard/mainboard.component';
import { BalanceComponent } from './mainboard/notification-balance/balance.component';
import { WithdrawComponent } from './mainboard/withdraw/withdraw.component';
import { DepositeComponent } from './mainboard/deposite/deposite.component';
import { NotificationComponent } from './mainboard/notification/notification.component';
import { PrintPageComponent } from './mainboard/notification-balance/print-page/print-page.component';
import { DatePipe } from '@angular/common';
import { OtherAmountComponent } from './mainboard/withdraw/other-amount/other-amount.component';
import { OtherDepositeComponent } from './mainboard/deposite/other-deposite/other-deposite.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialogComponent,
    NotificationDialogComponent,
    PincodeDialogComponent,
    MainboardComponent,
    BalanceComponent,
    WithdrawComponent,
    DepositeComponent,
    NotificationComponent,
    PrintPageComponent,
    OtherAmountComponent,
    OtherDepositeComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    JwtModule.forRoot({ 
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['http://localhost:4200/'], 
        disallowedRoutes: [''], 
      },
    }),
  ],

  providers: [
    JwtHelperService, 
    DatePipe,
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
