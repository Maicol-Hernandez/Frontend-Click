import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagosComponent} from './pagos/pagos.component'; 
import { DetalleproductoComponent } from './detalleproducto/detalleproducto.component';
import { NegociosComponent } from './negocios/negocios.component';
import { HomeComponent } from '../app/home/home.component';
import { NosotrosComponent } from '../app/nosotros/nosotros.component';
import { RegistrarEmpresaComponent } from '../app/registrar-empresa/registrar-empresa.component';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component'
import { CrearProductosComponent } from'../app/crear-productos/crear-productos.component';
import { RegistroComponent } from '../app/registro/registro.component';
import { LoginComponent } from './login/login.component';
import { FacturaComponent } from './factura/factura.component'

const routes: Routes = [
  { path: 'vernegocio', component:NegociosComponent },
  { path:'',component:HomeComponent}, 
  { path:'nosotros',component:NosotrosComponent},
  { path: 'registrarEmpresa',component:RegistrarEmpresaComponent},
  { path: 'detallesproducto/:id', component:DetalleproductoComponent },
  { path: 'crearproducto', component:CrearProductosComponent },
  { path: 'detallesproducto', component:DetalleproductoComponent },
  { path: 'formulario-pedido', component: FormularioPedidoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component:LoginComponent},
  { path: 'registro-usuario', component:RegistroUsuarioComponent},
  { path: 'factura', component:FacturaComponent},
  {path :'pagos', component: PagosComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
