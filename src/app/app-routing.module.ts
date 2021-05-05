import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleproductoComponent } from './detalleproducto/detalleproducto.component';
import { CarritoComponent } from './carrito/carrito.component'
import { NegociosComponent } from './negocios/negocios.component'
import { HomeComponent } from '../app/home/home.component';
import { NosotrosComponent } from '../app/nosotros/nosotros.component';
import { RegistrarEmpresaComponent } from '../app/registrar-empresa/registrar-empresa.component';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component'
import { CrearProductosComponent } from'../app/crear-productos/crear-productos.component';


const routes: Routes = [
  { path: 'vernegocio/id', component:NegociosComponent },
  { path: 'carrito', component:CarritoComponent },
  { path:'',component:HomeComponent},
  { path:'nosotros',component:NosotrosComponent},
  { path: 'registrarEmpresa',component:RegistrarEmpresaComponent},
  { path: 'detallesproducto/:id', component:DetalleproductoComponent },
  { path: 'crearproducto', component:CrearProductosComponent },
  { path: 'formulario-pedido', component: FormularioPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
