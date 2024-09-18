import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    if (this.email === 'admin' && this.password === 'admin') {
      localStorage.setItem('userPassword', this.password);
      this.router.navigate(['/admin']);
    } else {
      alert('Invalid credentials. Please enter "admin" as both username and password.');
    }
  }
}
