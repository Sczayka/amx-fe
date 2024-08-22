import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhoneNumber',
  standalone: true
})
export class FormatPhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length === 10)
      return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    
    if (value.length === 11)
      return value.replace(/(\d{2})(\d)(\d{4})(\d{4})/, '($1) $2 $3-$4');
    
    return value
  }
}
