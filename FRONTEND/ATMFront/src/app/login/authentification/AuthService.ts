import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:8080/atm';
  private loggedUser ?: string;
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  findAccount (accountnumber: {number: String}):Observable<any> {
    return this.http.get(`${this.baseUrl}/account/accountNumber/${accountnumber.number}`, {responseType: 'text'})
  }
  
  login( login: string, code: string ) {
    const headers = new HttpHeaders().set('Content-Type', `application/x-www-form-urlencoded`);
    const body = new URLSearchParams();
    body.set('login', login);
    body.set('code',code);
    return this.http.post(`${this.baseUrl}/account/login`,  body.toString(), {headers, responseType: 'text'})
      .pipe(tap((tokens : any) => {
        this.doLoginUser(login, JSON.stringify(tokens));
        this.getCurrentAccount();
      })
    );
  }

  private doLoginUser(login: string, token: any){
    this.loggedUser = login;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  getCurrentAccount(): Observable<any> {
    const tokenString = localStorage.getItem(this.JWT_TOKEN);
  if (!tokenString) {
    return of(null); 
  }
  const decodedToken = jwtDecode(tokenString);
  const token = JSON.parse(tokenString);
  const accountId = decodedToken.sub;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.baseUrl}/account/${accountId}`, { headers });
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    window.sessionStorage.clear;
    this.isAuthenticatedSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }
  
  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access_token;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  getJWTToken(): string {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }

 
/*
  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.http
      .post<any>(`${this.baseUrl}/auth/refresh-token`, {
        refreshToken,
      })
      .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }
*/
}
