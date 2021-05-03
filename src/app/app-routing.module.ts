import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoComponent } from './carrito/carrito.component';
import { NegociosComponent } from './negocios/negocios.component';
import { DetalleproductoComponent } from './detalleproducto/detalleproducto.component';


const routes: Routes = [
{ path: 'vernegocio', component:NegociosComponent },
{ path: 'carrito', component:CarritoComponent },
{ path: 'detallesproducto/:id', component:DetalleproductoComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
