import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { HttpClientModule } from '@angular/common/http';
import { DecimalPipePipe } from './pipes/decimal-pipe.pipe';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ModifyProductComponent } from './components/modify-product/modify-product.component';
import { ErrorConnectionComponent } from './components/error-connection/error-connection.component';
import { AckDeleteComponent } from './components/ack-delete/ack-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    DecimalPipePipe,
    CreateProductComponent,
    ModifyProductComponent,
    ErrorConnectionComponent,
    AckDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
   
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
