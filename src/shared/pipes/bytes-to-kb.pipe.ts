import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytesToKb',
  standalone: true
})
export class BytesToKbPipe implements PipeTransform {
  transform(value: number, decimalPlaces: number = 2): string {
    if (value == null) return '';

    const kb = value / 1024;

    return `${kb.toFixed(decimalPlaces)} KB`;
  }
}
