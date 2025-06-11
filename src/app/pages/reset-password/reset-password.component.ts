import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  message = '';
  error = '';
  password = '';
  confirmPassword = '';
  showButton = false;
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  sendResetPassword(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
        if (this.password !== this.confirmPassword) {
          this.error = 'As senhas não coincidem.';
          return;
        }

      this.authService.ConfirmResetPassword(token, this.confirmPassword).subscribe({
        next: () => {
          this.message = 'Senha restaurada com sucesso! Redirecionando...';
          this.error='';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.message = 'Erro ao restaurar senha. Token inválido ou expirado.';
        },
      });
    } else {
      this.message = 'Token não encontrado na URL.';
    }
  }
}