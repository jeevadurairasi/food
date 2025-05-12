import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ViewUsersComponent } from './pages/admin-home/view-users/view-users.component';
import { AddRestaurantsComponent } from './pages/admin-home/add-restaurants/add-restaurants.component';
import { ListOrdersComponent } from './pages/admin-home/list-orders/list-orders.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'; 
const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Default route
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'signup', component: SignupComponent }, // Signup page
 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Home page (protected by AuthGuard)
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Profile page (protected by AuthGuard)
  { path: 'admin', component: AdminComponent },
  { path: 'admin-home', component: AdminHomeComponent, children: [
    { path: 'view-users', component: ViewUsersComponent },
    { path: 'add-restaurants', component: AddRestaurantsComponent },
    { path: 'list-orders', component: ListOrdersComponent },
  ],
}, // Admin homepage
 { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '**', redirectTo: '' }, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


