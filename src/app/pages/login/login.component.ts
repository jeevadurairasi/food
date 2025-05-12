import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  generatedCode: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
    });

    this.generateCaptcha(); // Generate CAPTCHA when the component loads
  }

  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.generatedCode = Array.from({ length: 6 })
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join('');
  }

onLogin(): void {
  if (this.loginForm.invalid) {
    alert('Please fill in all required fields!');
    return;
  }

  const { identifier, password } = this.loginForm.value;

  this.http.post('http://localhost:3000/api/users/login', { identifier, password })
    .subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debugging log
        alert('Login successful!');
        this.router.navigate(['/home']); // Navigate to the Home page
      },
      (error) => {
        console.error('Login failed:', error);
        alert(error.error.message || 'An error occurred during login.');
      }
    );
}
  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']); // Navigate to the Forgot Password page
  }
}