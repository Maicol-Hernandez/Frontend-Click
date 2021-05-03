import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from'@angular/forms';
import { AppComponent } from './app.component';


import { NegociosComponent } from './negocios/negocios.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetalleproductoComponent } from './detalleproducto/detalleproducto.component';

@NgModule({
  declarations: [
    AppComponent,
    NegociosComponent,
    CarritoComponent,
    DetalleproductoComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
