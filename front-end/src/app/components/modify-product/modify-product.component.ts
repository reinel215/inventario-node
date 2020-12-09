import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';



import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductTable } from 'src/app/interfaces/ProductTable';
import { ProductoService } from 'src/app/services/productoService/producto-service.service';
import { ValidarCamposService } from 'src/app/services/validarCampos/validar-campos.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  public nombre: string;
  public precio: string = '';
  public cantidad: string = '';
  public descripcion: string;



  public cargando: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<ModifyProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductTable,
    private productService: ProductoService,
    private validarService: ValidarCamposService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.nombre = this.data.nombre;
    this.precio = this.data.precio.toString();
    this.cantidad = this.data.cantidad.toString();
    this.descripcion = this.data.descripcion;


  }




  datosInvalidos(): boolean {

    if (!this.nombre || !this.descripcion || !this.cantidad || !this.precio || !this.validarService.decimales(this.precio) || !this.validarService.soloEnteros(this.cantidad)) {
      return true;
    }

    return false;

  }





  modificarProducto() {

    if (this.datosInvalidos()) {
      this.snackBar.open('valores con datos incorrectos o incompletos', 'cerrar', {
        panelClass: 'error-snack',
        duration: 3000,
      });
      return;
    }


    //habilitamos la progress bar y desabilitamos los botones
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

    this.productService.updateProduct(formData, this.data.id).subscribe(
      (event) => {

        this.dialogRef.close('finalizado');

      }
      ,
      (err) => { 
        
        if (err?.error?.code === '23505'){
          this.dialogRef.close('nombre_invalido');
          return;
        }
        
        this.dialogRef.close('error') 
      
      }
    );

  }




  cerrar(): void {

    this.dialogRef.close('cancelado');

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


}
