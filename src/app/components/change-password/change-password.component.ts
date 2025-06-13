import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<{ current: string; newPass: string }>();


  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';

  isValid(): boolean {
    return this.newPassword === this.confirmPassword
  }

  submit() {
    if (!this.isValid()) {
      this.errorMessage = 'As senhas não coincidem ou estão vazias.';
      return;
    }

    this.updated.emit({
      current: this.currentPassword,
      newPass: this.newPassword
    });

    this.close.emit();
  }
}
