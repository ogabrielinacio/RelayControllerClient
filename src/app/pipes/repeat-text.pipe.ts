import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeatText',
  standalone: true,
})
export class RepeatTextPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Não Repetir';
      case 1:
        return 'Diariamente';
      case 2:
        return 'Semanalmente';
      case 3:
        return 'Mensalmente';
      default:
        return 'Desconhecido';
    }
  }
}
