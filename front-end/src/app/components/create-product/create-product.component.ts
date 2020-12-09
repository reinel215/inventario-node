import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  public progress: number;

  public cargando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductoService,
    private validarService: ValidarCamposService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

  }



  datosInvalidos(): boolean {

    if (!this.nombre || !this.descripcion || !this.cantidad || !this.precio || !this.validarService.decimales(this.precio) || !this.validarService.soloEnteros(this.cantidad)) {
      return true;
    }

    return false;

  }


  crearProducto(): void {

    if (this.datosInvalidos()) {
      console.log('datos invalidos');
      this.snackBar.open('valores con datos incorrectos o incompletos','cerrar', {
        panelClass: 'error-snack',
        duration: 3000,
      });
      return;
    }


    //habilitamos la progress bar y deshabilitamos los botones
    this.cargando = true;


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

      //respuesta final
      if (event.type === HttpEventType.Response) {
        console.log("donwload completed");
        this.dialogRef.close('finalizado');
      }


      //eventos para el progreso de la carga
      if (event.type === HttpEventType.UploadProgress) {

        this.actualizarUpload(event);

      }

    },

      (err) => { 
        
        if (err?.error?.code === '23505'){
          this.dialogRef.close('nombre_invalido');
          return;
        }
        
        this.dialogRef.close('error') 
      
      }
    );

  }






  actualizarUpload(event) {

    this.progress = Math.round((event.loaded / event.total) * 100);
    console.log(this.progress);


  }




  soloEnteros(event: KeyboardEvent) {

    this.cantidad == null ? this.cantidad = '' : null;

    const pattern = /[0-9]/;

    const inputChar = event.key;

    if (!pattern.test(inputChar)) {

      event.preventDefault();

    }

  }



  soloDecimales(event: KeyboardEvent) {

    this.precio === null ? this.precio = '' : null;


    const numberPattern = /[0-9]/;
    const decimalPattern = /\./;


    const inputChart = event.key;


    if (!numberPattern.test(inputChart) && !decimalPattern.test(inputChart)) {

      event.preventDefault();

    }

  }



  cerrar(): void {

    this.dialogRef.close('cancelado');

  }


}
