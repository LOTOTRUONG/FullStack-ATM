import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseUrl = 'http://localhost:8080/atm/operation';

  constructor(private http: HttpClient) { }

  withdraw(idAccount: number, amount: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', `application/x-www-form-urlencoded`);
    const body = new URLSearchParams();
    body.set('amount', amount.toString());
    return this.http.post(`${this.baseUrl}/withdraw/${idAccount}`, body.toString(), { headers });
  }

  deposite(idAccount: number, amount: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', `application/x-www-form-urlencoded`);
    const body = new URLSearchParams();
    body.set('amount', amount.toString());
    return this.http.post(`${this.baseUrl}/deposite/${idAccount}`, body.toString(), { headers });
  }
}
