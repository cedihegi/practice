import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, RegisterReponse } from '../models/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = "http://localhost:8080/users"
  constructor(private httpClient: HttpClient) { }

  register(username: string, password: string): Observable<RegisterReponse> {
    const body = { username, password };
    return this.httpClient.post<RegisterReponse>(`${this.apiUrl}/register`, body);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = [username, password];
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, body, { withCredentials: true });
  }
}
