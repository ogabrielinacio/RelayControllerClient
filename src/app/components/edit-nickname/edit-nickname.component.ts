import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-nickname',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-nickname.component.html',
  styleUrl: './edit-nickname.component.scss'
})
export class EditNicknameComponent {
  @Input() boardId: string = '';
  @Input() currentName: string = '';
  @Output() renamed = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  newName: string = '';
  error: string | null = null;

  ngOnInit(): void {
    this.newName = this.currentName;
  }

  isValid(): boolean {
    return this.newName.trim().length > 0;
  }

  save(): void {
    if (!this.isValid()) {
      this.error = 'Nome não pode ser vazio.';
      return;
    }

    this.error = null;

    this.renamed.emit();
    this.close.emit();
  }
}
