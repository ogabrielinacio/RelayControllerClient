import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
