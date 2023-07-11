import { Pipe, PipeTransform } from '@angular/core';

declare var numeral: any;

@Pipe({name: 'numeral'})
export class NumeralPipe implements PipeTransform {
   transform(value: number, format?: string): string {
      if (value === undefined) { return '—'; }
      return numeral(value).format(format || '0,0');
   }
}

@Pipe({name: 'money'})
export class MoneyPipe implements PipeTransform {
   transform(value: number): string {
      if (value === undefined) { return '—'; }
      return numeral(value).format('0,0.00');
   }
}

@Pipe({name: 'positiveNumber'})
export class PositiveNumber implements PipeTransform {
    transform(value: number): number { 
      return Math.abs(value);
    }
}

@Pipe({name: 'checkNullString'})
export class StringPipe implements PipeTransform {
   transform(value: string): string {
      if (value === undefined) { return '-'; }
      if (value === null) { return '-'; }
      if (value === '') { return '-'; }
      return value;
   }
}