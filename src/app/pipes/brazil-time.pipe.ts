import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brazilTime',
  standalone: true,
})
export class BrazilTimePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return 'Não definido';

    const [hourStr, minStr, secStr] = value.split(':');

    if (
      hourStr === undefined ||
      minStr === undefined ||
      secStr === undefined ||
      isNaN(+hourStr) ||
      isNaN(+minStr) ||
      isNaN(+secStr)
    ) {
      return 'Não definido';
    }

    let hours = (+hourStr + 21) % 24;
    const formatted = [
      String(hours).padStart(2, '0'),
      minStr.padStart(2, '0'),
      secStr.padStart(2, '0'),
    ].join(':');

    return formatted;
  }
}
