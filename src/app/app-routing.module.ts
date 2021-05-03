import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoComponent } from './carrito/carrito.component'
import { NegociosComponent } from './negocios/negocios.component'
import {HomeComponent} from '../app/home/home.component';
import {NosotrosComponent} from '../app/nosotros/nosotros.component';
import {RegistrarEmpresaComponent} from '../app/registrar-empresa/registrar-empresa.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import {  FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component'
const routes: Routes = [
{ path: 'vernegocio', component:NegociosComponent },
{ path: 'carrito', component:CarritoComponent },
{path:'',component:HomeComponent},
{path:'nosotros',component:NosotrosComponent},
{path: 'registrarEmpresa',component:RegistrarEmpresaComponent},
{path: 'detalles-pedido', component: DetallesPedidoComponent},
{path: 'formulario-pedido', component: FormularioPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
