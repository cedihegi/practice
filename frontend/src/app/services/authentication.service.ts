import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap } from 'rxjs';
import { AuthState, UserInfo } from '../models/auth-types';
import { NotificationsService } from './notifications.service';

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
    return response.pipe(switchMap(_ => {
      // on successful login, update user info
      return this.update_user_info()
    }))
  }

  logout() {
    this.httpClient.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe({
        next: (_) => {
          console.log("Logout successful");
          this.notificationService.showSuccess("Logged out successfully")
          this.update_user_info().subscribe()
        },
        error: (err) => {
          const err_msg = err.error?.message || err.message;
          this.notificationService.showError("logout failed with error: " + err_msg);
        }
      });
    return
  }

  update_user_info() {
    const response = this.httpClient.get<UserInfo>(
      `${this.apiUrl}/current-user`, { withCredentials: true }
    );
    return response.pipe(
      tap({
        next: (result: UserInfo) => {
          this.authState.next({
            logged_in: true,
            username: result.username,
            id: result.id

          })
        },
        error: (_) => this.authState.next({ logged_in: false })
      })
    )
  }
}
