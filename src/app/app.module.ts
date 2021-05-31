import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { RegistroComponent } from './registro/registro.component';
import { FacturaComponent } from './factura/factura.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


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
    RegistroComponent,
    FacturaComponent,
  ],
  imports: [
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
