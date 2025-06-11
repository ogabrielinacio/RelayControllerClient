import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-send-recovery-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './send-recovery-password.component.html',
  styleUrl: './send-recovery-password.component.scss'
})
export class SendRecoveryPasswordComponent {
  message = '';
  error = '';
  email = '';
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private authService: AuthService){}

  isValidEmail(): boolean {
    return this.emailRegex.test(this.email);
  }

  sendRecoveryPasswordEmail(): void {
    if (!this.email.trim()) {
      this.error = 'O email é obrigatório.';
      return;
    }

    if (!this.isValidEmail()) {
      this.error = 'Email inválido.';
      return;
    }

    this.authService.sendRecoveryPasswordEmail(this.email).subscribe({
      next: () => {
        this.message = 'E-mail de recuperação de senha enviado com sucesso!';
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
