import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.scss'
})
export class EditNameComponent {
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<string>();
  
  newName = '';

  submit() {
    this.updated.emit(this.newName);
  }
}
