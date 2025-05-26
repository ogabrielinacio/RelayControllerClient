import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() message: string = 'Tem certeza?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
}
