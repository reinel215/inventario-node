import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }




  soloEnteros(cantidad : string){

    const pattern = /^[1-9][0-9]*$/;

    return pattern.test(cantidad);

  }




  decimales(cantidad : string){

    const pattern = /^\d+(\.\d+)?$/;

    return pattern.test(cantidad);
  }

}
