import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements AfterViewInit {
  username: string = '';
  password: string = '';
  about_info: string = '';

  // html references:
  @ViewChild('username_input') usernameInput!: ElementRef;


  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private router: Router,
    private notificationService: NotificationsService,
  ) { }

  ngAfterViewInit() {
    this.usernameInput.nativeElement.focus()
  }

  register(): void {
    if (!this.username || !this.password) {
      this.notificationService.showError("Please fill in both fields");
      return;
    }
    this.authService.register(this.username, this.password).subscribe({
      error: (err) => {
        const error_msg = err.error?.message || err.message;
        this.notificationService.showError("Registration failed with error: " + error_msg)
      }
    });
    this.clear();
  }

  login(): void {
    if (!this.username || !this.password) {
      this.notificationService.showError('Pease fill in both fields');
      return
    }
    this.authService.login(this.username, this.password).subscribe({
      next: (_) => {
        this.router.navigate([''])
      },
      error: (err) => {
        console.log("login: encountered error");
        this.clear();
        this.usernameInput.nativeElement.focus();

      }
    })
  }

  clear(): void {
    this.username = '';
    this.password = '';
  }

  getAbout(): void {
    this.apiService.getAbout(42).subscribe((res) => {
      this.about_info = JSON.stringify(res);
      console.log(res)
    })

  }
}
