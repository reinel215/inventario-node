import { Component, OnInit } from '@angular/core';
import { Product } from './interfaces/Product';
import { ProductoService } from './services/producto-service.service';

import {MatTableDataSource} from '@angular/material/table';

import {animate, state, style, transition, trigger} from '@angular/animations';


import { API_URL } from "./config/API_URL";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class AppComponent implements OnInit{
  
  
  expandedElement: Product | null;


  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'cantidad', 'precio'];


  public products : Product[];
  public dataSource;

  constructor(private productServie: ProductoService,

    ) { }



  ngOnInit(): void {

    this.retrieveProducts();
  
  }


  retrieveProducts() {

    this.productServie.getProducts()
      .subscribe(
        (products: Product[]) => {

          this.products = products;

          
          let withoutImageUrl = products.map( product => {
            let {image_url, ...rest} = product;
            return rest;
          } );

          this.dataSource = new MatTableDataSource(withoutImageUrl);
          
        
        },

        err => { console.error("error en el lado del cliente"); }

      );
  }



  private encontrarImagen(id) : string{

    const url : string = this.products.find( product => product.id===id ).image_url;

    if ( url ){
      return API_URL + '/' + url;
    }
    else {
      return '../assets/defaultImage.png';
    }

  }

  public calcularTotal() : number{
    return this.dataSource.filteredData.map( (product) => product.precio ).reduce( (acc,precio) => acc+precio,0 );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  saludar() {
    console.log("hola");
  }
}
