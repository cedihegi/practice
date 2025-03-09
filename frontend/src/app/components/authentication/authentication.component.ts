import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  about_info: string = '';

  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService
  ) { }

  register(): void {
    if (!this.username || !this.password) {
      this.message = "Please fill in both fields";
      return;
    }
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.message = `User registered: ${response.username}`;
      },
      error: (error) => {
        this.message = 'Registration failed: ' + (error.error?.message || error.message);
      }
    });
  }
  login(): void {
    if (!this.username || !this.password) {
      this.message = 'Pease fill in both fields';
      return
    }
    this.authService.login(this.username, this.password).subscribe({
      next: (_) => {
        this.message = 'Login succeeded. Token stored';
      },
      error: (error) => {
        this.message = 'Login failed with error ' + (error.error?.message || error.message);
      }
    })
  }
  getAbout(): void {
    this.apiService.getAbout(42).subscribe((res) => {
      this.about_info = JSON.stringify(res);
      console.log(res)
    })

  }
}
