import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPipe'
})
export class DecimalPipePipe implements PipeTransform {

  transform(value: string | number): string {

    let valueString = value.toString()


    let [parteEntera, parteDecimal] = valueString.split('.');

    
    if( parteDecimal && parteDecimal.length > 2){

      parteDecimal =  parteDecimal.slice(0,2);
      parteDecimal = "," + parteDecimal;

    }else if (parteDecimal && parteDecimal.length >= 1 ){

      parteDecimal = "," + parteDecimal;

    }else{
      parteDecimal = '';
    }


    return parteEntera + parteDecimal;
    
  }

}
