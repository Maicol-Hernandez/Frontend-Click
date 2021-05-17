import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from'@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { NegociosComponent } from './negocios/negocios.component';
import { DetalleproductoComponent } from './detalleproducto/detalleproducto.component';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';
import { RegistrarEmpresaComponent } from './registrar-empresa/registrar-empresa.component';

import { CrearProductosComponent } from './crear-productos/crear-productos.component';

import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { FacturaComponent } from './factura/factura.component';


@NgModule({
  declarations: [
    AppComponent,
    NegociosComponent,
    DetalleproductoComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    NosotrosComponent,
    FormularioPedidoComponent,
    RegistrarEmpresaComponent,
    CrearProductosComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    FacturaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
