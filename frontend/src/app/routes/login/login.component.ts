import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthenticationComponent } from '../../components/authentication/authentication.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, AuthenticationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
