import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {
  message = 'Confirmando seu e-mail...';
  error = '';
  email = '';
  showButton = false;
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.confirmEmail(token).subscribe({
        next: () => {
          this.message = 'E-mail confirmado com sucesso! Redirecionando...';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.message = 'Erro ao confirmar o e-mail. Token inválido ou expirado.';
          this.showButton = true;
        },
      });
    } else {
      this.message = 'Token não encontrado na URL.';
      this.showButton = true;
    }
  }

  isValidEmail(): boolean {
    return this.emailRegex.test(this.email);
  }

  resendEmail(): void {
    if (!this.email.trim()) {
      this.error = 'O email é obrigatório.';
      return;
    }

    if (!this.isValidEmail()) {
      this.error = 'Email inválido.';
      return;
    }

    this.authService.sendConfirmEmail(this.email).subscribe({
      next: () => {
        this.message = 'E-mail de confirmação reenviado com sucesso!';
        this.error = '';
      },
      error: (err) => {
        if (err.status === 404) {
          this.error =
            'Usuário com este email não existe';
        }
      },
    });
  }

}
