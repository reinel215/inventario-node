import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPipe'
})
export class DecimalPipePipe implements PipeTransform {

  transform(value: string): string {


    let [parteEntera, parteDecimal] = value.split('.');

    
    if( parteDecimal && parteDecimal.length > 2){

      parteDecimal =  parteDecimal.slice(0,2);
      parteDecimal = "," + parteDecimal;

    }else if (parteDecimal && parteDecimal.length >= 1 ){

      parteDecimal = "," + parteDecimal;

    }else{
      parteDecimal = '';
    }

    console.log(parteEntera + parteDecimal);

    return parteEntera + parteDecimal;
    
  }

}
