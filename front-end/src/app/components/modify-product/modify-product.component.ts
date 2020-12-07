import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';



import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductTable } from 'src/app/interfaces/ProductTable';
import { ProductoService } from 'src/app/services/productoService/producto-service.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  public nombre : string;
  public precio : string;
  public cantidad : string = '';
  public descripcion : string;



  constructor(
    public dialogRef: MatDialogRef<ModifyProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductTable,
    private productService: ProductoService
  ) { }

  ngOnInit(): void {
    
    this.nombre = this.data.nombre;
    this.precio = this.data.precio.toString();
    this.cantidad = this.data.cantidad.toString();
    this.descripcion = this.data.descripcion;


  }





  soloEnteros(event: KeyboardEvent) {

    this.cantidad == null ? this.cantidad = '' : null;

    const pattern = /^[1-9][0-9]*$/;

    const inputChar = event.key;
    let cantidad = this.cantidad + inputChar;


    if (!pattern.test(cantidad)) {

      event.preventDefault();

    }

  }




  modificarProducto() {

    let file : File = null;
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

    this.productService.updateProduct(formData,this.data.id).subscribe(
      (result) => {
        console.log(result);
      }
      ,
      err => { console.log(err) }
    );

  }





  cerrar(): void {

    this.dialogRef.close(null);

  }

}
