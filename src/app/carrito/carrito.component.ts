import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { CartService } from '../servicios/cart.service';
//import { IItem } from '../interfaces/item.interface';
import { DetalleproductoComponent } from '../detalleproducto/detalleproducto.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public items: Array<DetalleproductoComponent>
  public totalPrecio:number = 0;
  public totalCantidad:number = 0;
  constructor(private cartService:CartService, private client: ClientService ) { }

  ngOnInit() {}
  /*
  ngOnInit() {
    this.cartService.datoCarrito.subscribe(dato=>{
      if(dato)
      {
        this.items = dato;
        this.totalCantidad = dato.length;
        this.totalPrecio = dato.reduce((sum, articulo) => sum + (articulo.precio * articulo.cantidad), 0);
      }
    })
  }
*/
  comprar(){

    //this.client.postRequest("",producto).subscribe()
  }

  /*
  public remover(producto:DetalleproductoComponent){
    this.cartService.removerElementosCarrito(producto);
  }*/
  
}
