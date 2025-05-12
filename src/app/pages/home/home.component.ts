import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId: string = '';
  profilePhoto: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch user details from localStorage
    this.userId = localStorage.getItem('userId') || 'Guest';
    this.profilePhoto = localStorage.getItem('profilePhoto') || 'assets/default-profile.png';

    if (this.userId === 'Guest') {
      // Redirect to login page if no user is logged in
      this.router.navigate(['/login']);
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to Profile Page
  }

  onSignout(): void {
    // Clear user session data
    localStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}