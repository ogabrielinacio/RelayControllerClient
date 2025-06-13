import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { SendRecoveryPasswordComponent } from './pages/send-recovery-password/send-recovery-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'device/:id',
    loadComponent: () =>
      import('./pages/device/device.component').then((m) => m.DeviceComponent),
    canActivate: [authGuard],
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'send-recovery-password',
    component: SendRecoveryPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
