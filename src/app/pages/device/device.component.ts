import { Component } from '@angular/core';
import { RelayControllerApiService } from '../../services/RelayController/relay-controller-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RepeatTextPipe } from '../../pipes/repeat-text.pipe';
import { DayOfWeekTextPipe } from '../../pipes/day-of-week-text.pipe';
import { CommandsComponent } from '../../components/commands/commands.component';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
    RepeatTextPipe,
    DayOfWeekTextPipe,
    CommandsComponent,
    RouterLink,
  ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent {
  device: any = null;

  constructor(
    private route: ActivatedRoute,
    private relayControllerService: RelayControllerApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchNewInfo(id);
    }
  }

  toggleEnable(): void {
    if (!this.device?.id) return;

    const action$ = this.device.isEnable
      ? this.relayControllerService.disableController(this.device.id)
      : this.relayControllerService.enableController(this.device.id);

    action$.subscribe({
      next: () => {
        this.device.isEnable = !this.device.isEnable;
      },
    });
  }

  fetchNewInfo(id: string): void {
    this.relayControllerService.getControllerById(id).subscribe({
      next: (res) => {
        const data = res?.data;
        if (data) {
          this.device = data;
          console.log('Info atualizada do controller recebida com sucesso.');
        }
      },
      error: (err) => {
        console.error('Erro ao buscar info do controller:', err);
      },
    });
  }
}
