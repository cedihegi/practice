import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs';
import { AuthState } from '../../models/auth-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authState$: Observable<AuthState>;
  constructor(private authService: AuthenticationService) {
    this.authState$ = authService.authState$;
  }

  logout() {
    this.authService.logout()
  }
}
