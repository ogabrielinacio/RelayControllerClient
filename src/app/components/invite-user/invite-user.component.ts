import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserBoardService } from '../../services/UserBoard/user-board.service';

@Component({
  selector: 'app-invite-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './invite-user.component.html',
  styleUrl: './invite-user.component.scss',
})
export class InviteUserComponent {
  @Input() boardId: string = '';
  @Output() close = new EventEmitter<void>();

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  email: string = '';
  roleId: number = 2; // Default: Manager
  error: string | null = null;

  constructor(private userBoardService: UserBoardService) {}

  isValidEmail(): boolean {
    return this.emailRegex.test(this.email);
  }

  sendInvite(): void {
    this.error = null;

    if (!this.email.trim()) {
      this.error = 'O email é obrigatório.';
      return;
    }

    if (!this.isValidEmail()) {
      this.error = 'Email inválido.';
      return;
    }

    const request = {
      boardId: this.boardId,
      email: this.email.trim(),
      roleId: this.roleId,
    };

    this.userBoardService.addUserToDevice(request).subscribe({
      next: (res) => {
        if (res?.success) {
          this.emitClose();
        } else {
          this.error = res.message || 'Erro ao convidar usuário.';
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.error = 'Usuário não encontrado.';
        } else if (err.status === 409) {
          this.error = 'Usuário já possui acesso.';
        } else {
          this.error = 'Erro inesperado ao convidar usuário.';
        }
      },
    });
  }

  emitClose(): void {
    this.close.emit();
  }
}