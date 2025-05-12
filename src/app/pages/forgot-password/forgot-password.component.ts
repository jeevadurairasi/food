import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      userId: ['', Validators.required], // User ID field
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const { userId, newPassword, confirmPassword } = this.forgotPasswordForm.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Call the API to reset the password
    this.http
      .post('http://localhost:3000/api/users/forgot-password', { userId, newPassword })
      .subscribe(
        (response: any) => {
          alert('Password reset successful!');
          this.router.navigate(['/login']); // Redirect to login page
        },
        (error) => {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      );
  }
}