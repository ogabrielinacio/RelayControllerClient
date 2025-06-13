import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-email.component.html',
  styleUrl: './edit-email.component.scss'
})
export class EditEmailComponent {
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<string>();

  newEmail = '';

  submit() {
    this.updated.emit(this.newEmail);
  }
}
