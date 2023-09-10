import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberConvert',
})
export class NumberConvertPipe implements PipeTransform {

  transform(amount: any, decimalCount = 2, thousands = ',') {
    if (Math.abs(amount) >= 100) {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      let decimalPlaces = Number(amount).toFixed(2).toString().split('.')[1];
      if (Number(decimalPlaces) > 0) {
        decimalPlaces = '.' + decimalPlaces;
      } else {
        decimalPlaces = '';
      }
      const negativeSign = amount < 0 ? '-' : '';

      let i = parseInt(
        (Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
        decimalPlaces
      );
    } else {
      return amount;
    }
  }

}
