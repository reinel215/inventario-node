import {  Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {


  public nombre : string;
  public precio : string;
  public cantidad : string = '';
  public descripcion : string;

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService : ProductoService
    ) {}

  ngOnInit(): void {

  }




  crearProducto() : void {
    
    let file : File;
    let productImageElemet : HTMLInputElement = (document.getElementById('productImage') as HTMLInputElement);


    if( productImageElemet.files.length > 0 ){

      file = productImageElemet.files.item(0);

    }
    

    
    let formData = new FormData();
    formData.append('productImage',file);
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio);
    formData.append('cantidad', this.cantidad);
    
    this.productService.insertProduct(formData).subscribe( (obj : Object) => {
      console.log(obj);
    } );

  }




  soloEnteros(event : KeyboardEvent){

    this.cantidad == null ? this.cantidad = '' : null;

    const pattern = /^[1-9][0-9]*$/;
    const inputChar = event.key;
    let cantidad = this.cantidad + inputChar;



    if (!pattern.test(cantidad)){

      event.preventDefault();

    }

  }



  cerrar() : void{

    this.dialogRef.close();

  }


}
