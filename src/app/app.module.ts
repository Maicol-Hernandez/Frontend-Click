import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { NegociosComponent } from './negocios/negocios.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    NegociosComponent,
    CarritoComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    NosotrosComponent,
    DetallesPedidoComponent,
    FormularioPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
