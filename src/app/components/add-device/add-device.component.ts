import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserBoardService } from '../../services/UserBoard/user-board.service';
import { AddBoardRequest } from '../../models/UserBoard/Requests/add-board-request.model';

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent {
  controllerId: string = '';
  customName: string = '';
  error: string = '';


  readonly guidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  
  @Output() close = new EventEmitter<void>();
  @Output() added = new EventEmitter<void>();
  constructor(private userBoardService: UserBoardService) {}

  emitAdd(): void {
    this.error = '';

    if (!this.controllerId.trim() || !this.customName.trim()) {
      this.error = 'Todos os campos são obrigatórios.';
      return;
    }

    if (!this.guidV4Regex.test(this.controllerId.trim())) {
      this.error = 'O GUID inserido é inválido.';
      return;
    }

    const request: AddBoardRequest = {
      boardId: this.controllerId.trim(),
      customName: this.customName.trim(),
    };

    this.userBoardService.addBoard(request).subscribe({
      next: (res) => {
        if (res?.success) {
          this.added.emit();
          this.emitClose();
        } else {
          this.error = res.message || 'Erro desconhecido.';
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.error = 'Placa não encontrada.';
        } else if (err.status === 409) {
          this.error = 'Essa placa já possui um dono.';
        } else {
          this.error = 'Erro inesperado ao adicionar a placa.';
        }
      },
    });
  }

  emitClose(): void {
    this.close.emit();
  }
}