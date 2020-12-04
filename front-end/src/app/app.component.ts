import { Component, OnInit } from '@angular/core';
import { Product } from './interfaces/Product';
import { ProductoService } from './services/producto-service.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { animate, state, style, transition, trigger } from '@angular/animations';


import { API_URL } from "./config/API_URL";


//IMPORTS MY COMPONENTS
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ModifyProductComponent } from './components/modify-product/modify-product.component';
import { ProductTable } from './interfaces/ProductTable';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class AppComponent implements OnInit {


  expandedElement: Product | null;

  //cuando es true muestre el componente de error
  public errorMessage: boolean = false;



  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'cantidad', 'precio', 'total'];


  public products: Product[];
  public dataSource;

  constructor(
    private productServie: ProductoService,
    private matDialog: MatDialog
  ) { }



  ngOnInit(): void {

    this.retrieveProducts();

  }







  private CrearDataTable(products: Product[]) {

    this.products = products;

    //le quitamos el url para que no afecte el filtro
    let withoutImageUrl = products.map(product => {
      let { image_url, ...rest } = product;
      return rest;
    });


    //le agregamos una nueva columna que sera el total
    let withTotal = withoutImageUrl.map(product => {

      return {
        ...product,
        total: product.cantidad * product.precio
      }

    });



    this.dataSource = new MatTableDataSource(withTotal);

    //quito el error si existe
    this.errorMessage = false;


  }





  //solicuta todos los productos para llenar la tabla
  retrieveProducts() {

    this.productServie.getProducts()
      .subscribe(
        (event) => {


          if (event.type === HttpEventType.DownloadProgress) {
            console.log("download progress:");
            console.log(event);
          }
          if (event.type === HttpEventType.Response) {
            console.log("donwload completed");
            this.CrearDataTable( (event.body as Product[]) );
          }

          if (event.type === HttpEventType.UploadProgress) {
            console.log("upload progress");
            console.log(event);
          }



        },

        err => {
          console.error("error en el lado del cliente");
          this.errorMessage = true;
        }

      );
  }













  //dado un "id" encuentra la URL de la imagen del producto
  private encontrarImagen(id): string {

    const url: string = this.products.find(product => product.id === id).image_url;

    if (url) {
      return API_URL + '/' + url;
    }
    else {
      return '../assets/defaultImage.png';
    }

  }



  //toma la data de la pagina filtrada y calcula el total
  public calcularTotal(): number {
    return this.dataSource.filteredData.map((product) => product.total).reduce((acc, precio) => acc + precio, 0);
  }








  // aplica un filtro para la tabla de material-ui
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


















  insertProduct() {

    const dialogRef = this.matDialog.open(CreateProductComponent, {
      width: '400px',
      height: '400px',
      data: {
        name: 'reinel',
        animal: 'loro'
      },
      panelClass: 'create-product-dialog',
      disableClose: true,
    })


    dialogRef.afterClosed().subscribe(result => {

    });

  }













  modifyProduct(product: ProductTable) {

    const dialogRef = this.matDialog.open(ModifyProductComponent, {
      width: '400px',
      height: '400px',
      data: {
        ...product
      },
      panelClass: 'create-product-dialog',
      disableClose: true,
    })


    dialogRef.afterClosed().subscribe((result: ProductTable) => {

    });

  }





















  deleteProduct(id: number | string) {
    console.log(id);

    this.productServie.deleteProduct(id)
      .subscribe((response: Object) => {

        this.retrieveProducts();
      },

        err => {
          console.log(err);
          console.log("error borrando el producto");
        }
      );


  }




  onReintentar() {
    this.retrieveProducts()
  }
}
