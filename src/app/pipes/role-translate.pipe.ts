import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleTranslate',
  standalone: true,
})
export class RoleTranslatePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Owner':
        return 'Dono';
      case 'Manager':
        return 'Gerente';
      default:
        return value;
    }
  }
}
