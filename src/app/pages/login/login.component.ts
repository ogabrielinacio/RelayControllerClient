import { LoginRequest } from './../../models/User/Requests/login-request.model';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    const request: LoginRequest = {
      email: email,
      password: password,
    };
    this.authService.login(request).subscribe({
      next: (res) => {
        const token = res.data.token;
        if (res.success && token) {
          localStorage.setItem('accessToken', token);
          this.router.navigate(['/home']);
        } else {
          this.error = res.message || 'Credenciais inválidas.';
          console.log('Erro da API:', res.message);
        }
      },
      error: (err) => {
        if (err.status === 403) {
          this.error =  'Email ou senha incorretos.';
        } else if (err.status === 0) {
          this.error = 'Servidor indisponível. Tente novamente mais tarde.';
        } else {
          this.error = 'Erro inesperado de conexão.';
        }
      },
    });
  }
}