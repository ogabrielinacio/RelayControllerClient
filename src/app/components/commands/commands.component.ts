import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    // const payload: UpdateRelayController = {
    //   id: this.controllerId,
    //   isActive: true,
    //   isEnable: true,
    //   startTime: this.startTime || undefined,
    //   endTime: this.endTime || undefined,
    //   repeat: this.repeat,
    // };

    // this.apiService.updateController(payload).subscribe({
    //   next: (response) => {
    //     console.log('Controller atualizado com sucesso:', response);
    //     this.actionCompleted.emit();
    //   },
    //   error: (error) => {
    //     console.error('Erro ao atualizar o controller:', error);
    //   },
    // });
  }
}
