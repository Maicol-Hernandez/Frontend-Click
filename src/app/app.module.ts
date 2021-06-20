import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from'@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
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
import { PagosComponent } from './pagos/pagos.component';
import { ZonaAdministracionComponent } from './zona-administracion/zona-administracion.component';
import { GestionarNegocioComponent } from './gestionar-negocio/gestionar-negocio.component';
import { ActualizarNegocioComponent } from './actualizar-negocio/actualizar-negocio.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { HistorialDePedidosComponent } from './historial-de-pedidos/historial-de-pedidos.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';


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
    FacturaComponent,
    PagosComponent,
    RegistroComponent,
    ZonaAdministracionComponent,
    GestionarNegocioComponent,
    ActualizarNegocioComponent,
    ActualizarProductoComponent,
    CrearProductoComponent,
    MiCuentaComponent,
    HistorialDePedidosComponent,
    DetallePedidoComponent
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
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
