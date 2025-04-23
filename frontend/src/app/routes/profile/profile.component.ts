import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthState } from '../../models/auth-types';
import { Observable, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authState$: Observable<AuthState>;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authState$ = authService.authState$;
    this.router = router
  }

  async ngOnInit() {
    const authState = await firstValueFrom(this.authState$);
    if (!authState.logged_in) {
      this.router.navigate(['login'])
    }
  }
}
