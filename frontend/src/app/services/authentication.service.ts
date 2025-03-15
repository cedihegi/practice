import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap } from 'rxjs';
import { AuthState, UserInfo } from '../models/auth-types';
import { NotificationsService } from './notifications.service';

const LOGGED_IN_HINT = "LOGGED_IN_HINT"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authState = new BehaviorSubject<AuthState>({ logged_in: false });
  authState$ = this.authState.asObservable();

  private apiUrl = "http://localhost:8080/users"
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationsService
  ) { }

  register(username: string, password: string): Observable<string> {
    const body = { username, password };
    return this.httpClient.post<string>(`${this.apiUrl}/register`, body);
  }

  login(username: string, password: string) {
    const body = [username, password];
    const response = this.httpClient.post(`${this.apiUrl}/login`, body, { withCredentials: true })
      .pipe(
        tap({
          error: (_) => {
            console.log("Error on login")
            this.notificationService.showError("Login failed")
          }
        })
      )
    return response.pipe(switchMap(_ => {
      localStorage.setItem(LOGGED_IN_HINT, "true");
      return this.update_user_info()
    }))
  }

  logout() {
    localStorage.setItem(LOGGED_IN_HINT, "false")
    this.authState.next({
      logged_in: false
    })
  }

  update_user_info() {
    const response = this.httpClient.get<UserInfo>(
      `${this.apiUrl}/current-user`, { withCredentials: true }
    );
    return response.pipe(
      tap({
        next: (result: UserInfo) => {
          const logged_in_hint = localStorage.getItem(LOGGED_IN_HINT);
          if (logged_in_hint == "true") {
            this.authState.next({
              logged_in: true,
              username: result.username,
              id: result.id

            })
          } else {
            this.authState.next({
              logged_in: false
            })
          }
        },
        error: (_) => localStorage.setItem(LOGGED_IN_HINT, "false")
      })
    )
  }
}
