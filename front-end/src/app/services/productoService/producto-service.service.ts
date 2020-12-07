import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { API_URL } from "../../config/API_URL";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient ) { }


  private errorHandler(error : HttpErrorResponse){

    if(error.error instanceof ErrorEvent){

      console.error(`Ocurrio un error en el lado del cliente`, error.error.message);

    }
    else{

      console.error(`Ocurrio un error en el servidor ` +
      `returned code ${error.status} ` +
      `returned error`, error.error
      );

    }

    //hacemos cosas con el error
    return throwError('Algo salio malisimo');

  }




  getProducts() : Observable<any> {
    
    const url = API_URL + "/api/products";

    return this.http.get<Product[]>(url, {reportProgress:true, observe : 'events'} )
    .pipe( 
      retry(3),
      catchError(this.errorHandler),
    );

  }




  insertProduct(formData : FormData) : Observable<any> {

    const url = API_URL + "/api/products";


    return this.http.post<any>(url, formData, {reportProgress:true, observe : 'events'})
    .pipe(
      catchError(this.errorHandler)
    );


  }



  deleteProduct(id : number | string) : Observable<Object>{
    const url = API_URL + '/api/products/' + id;

    return this.http.delete<Object>(url)
    .pipe(
      catchError(this.errorHandler)
    );
  }




  updateProduct(formData : FormData, id : number){

    const url = API_URL + '/api/products/' + id;


    return this.http.put<Object>(url,formData)
    .pipe(
      catchError(this.errorHandler)
    );

  }

}
