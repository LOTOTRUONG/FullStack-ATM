import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { MainboardComponent } from './mainboard/mainboard.component';
import { authGuard } from './login/authentification/auth.guard';
import { WithdrawComponent } from './mainboard/withdraw/withdraw.component';
import { DepositeComponent } from './mainboard/deposite/deposite.component';
import { BalanceComponent } from './mainboard/notification-balance/balance.component';
import { NotificationComponent } from './mainboard/notification/notification.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'mainboard',
    component: MainboardComponent,
    canActivate: [authGuard],
    children:[
      {
        path: 'withdraw',
        component: WithdrawComponent,
      },
      {
        path: 'deposite',
        component: DepositeComponent,
      },   
      {
        path: 'balance',
        component: BalanceComponent,
      }
    ]
  
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
