import { HttpEventType } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/productoService/producto-service.service';
import { ValidarCamposService } from 'src/app/services/validarCampos/validar-campos.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {


  public nombre: string;
  public precio: string = '';
  public cantidad: string = '';
  public descripcion: string;

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductoService,
    private validarService: ValidarCamposService
  ) { }

  ngOnInit(): void {

  }




  crearProducto(): void {

    let file: File = null;
    let productImageElemet: HTMLInputElement = (document.getElementById('productImage') as HTMLInputElement);


    if (productImageElemet.files.length > 0) {

      file = productImageElemet.files.item(0);

    }



    let formData = new FormData();
    formData.append('productImage', file);
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio);
    formData.append('cantidad', this.cantidad);

    this.productService.insertProduct(formData).subscribe((event) => {
      

      // if (event.type === HttpEventType.DownloadProgress) {
      //   console.log("download progress:");
      //   console.log(event);
      // }
      if (event.type === HttpEventType.Response) {
        console.log("donwload completed");
        console.log(event);
      }

      if (event.type === HttpEventType.UploadProgress){

        console.log("upload progress");
        console.log(event);

      }

    });

  }




  soloEnteros(event: KeyboardEvent) {

    this.cantidad == null ? this.cantidad = '' : null;

    const pattern = /[0-9]/;

    const inputChar = event.key;

    if (!pattern.test(inputChar)) {

      event.preventDefault();

    }

  }



  soloDecimales(event : KeyboardEvent) {

    this.precio === null ? this.precio = '' : null;

    
    const numberPattern = /[0-9]/;
    const decimalPattern = /\,/;


    const inputChart = event.key;


    if(!numberPattern.test(inputChart) && !decimalPattern.test(inputChart)){

      event.preventDefault();

    }

  }



  cerrar(): void {

    this.dialogRef.close();

  }


}
