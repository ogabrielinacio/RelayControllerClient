import { RoutineRequest } from './../../models/RelayController/Requests/routine-request.model';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { RelayControllerApiService } from '../../services/RelayController/relay-controller-api.service';
import { BrazilTimePipe } from '../../pipes/brazil-time.pipe';
import { Repeat } from '../../enums/repeat.enum';

@Component({
  selector: 'app-commands',
  standalone: true,
  imports: [BrazilTimePipe],
  templateUrl: './commands.component.html',
  styleUrl: './commands.component.scss',
})
export class CommandsComponent {
  @Input() controllerId: string = '';
  @Input() enable: boolean = false;
  @Output() actionCompleted: EventEmitter<void> = new EventEmitter<void>();

  startTime: string = '';
  endTime: string = '';
  minDateTime: string = '';
  repeat: Repeat = Repeat.DoNotRepeat;

  constructor(private apiService: RelayControllerApiService) {}

  ngOnInit(): void {
    const now = new Date();
    this.minDateTime = now.toISOString();
    this.startTime = this.minDateTime;
  }

  updateStartTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const localDate = new Date(input.value);
    localDate.setHours(localDate.getHours());
    this.startTime = localDate.toISOString();
  }

  updateEndTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const localDate = new Date(input.value);
    localDate.setHours(localDate.getHours());
    this.endTime = localDate.toISOString();
  }

  updateRepeat(event: Event): void {
    const input = event.target as HTMLSelectElement;
    this.repeat = +input.value as Repeat;
  }

  sendUpdateRequest(): void {
    const newRoutine : RoutineRequest = {
      id: this.controllerId,
      startTime: this.startTime ,
      repeat: this.repeat,
    };

    if (this.endTime) {
      newRoutine.endTime = this.endTime;
    }

    this.apiService.AddRoutine(newRoutine).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Erro ao atualizar o controller:', error);
      },
    });
  }
}
