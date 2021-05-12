import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { ClientService } from '../servicios/client.service';
import {AuthService} from '../servicios/auth.service';
import { CartService } from '../servicios/cart.service';
import { IItem } from '../interfaces/item.interface';
@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})
export class DetalleproductoComponent implements OnInit {

  
  data;
  aumentoTotal: number;
  public items: Array<IItem>
  public totalCantidad:number = 0;
  public precioTotal:number = 0;

  constructor(
    private route: ActivatedRoute, 
    private client: ClientService,
    public auth : AuthService,
    private cartService: CartService

    ){}

  ngOnInit() {
    console.log("Se imprime public items: Array<IItem>: ", this.items)
    this.cartService.datoCarrito.subscribe(dato => {
      if(dato){
        this.items = dato
        this.totalCantidad = dato.length
        this.precioTotal = dato.reduce((sum, articulo) => sum + (articulo.precio * articulo.cantidad), 0)
        
      }
    });

    //Variable que trae la informacion del localStorage
    this.data = JSON.parse(this.cartService.getPedidos());
    console.log("Este son detalles ",this.data);

    /*
    this.cartService.total.subscribe(total => { 
      this.aumentoTotal = total
      console.log("VALOR TOTAL ", this.aumentoTotal)
    });
*/
    //console.log("ESTE ES VALOR DEL CARRITO: ",this.cartService);
    
  }
  

  enviarPruductos(){
    this.client.postRequestEnviarProductos('http://localhost:5000/api/v01/user/enviarproductos',this.data).subscribe(

    )
  }


  onRemoverItem(producto: IItem) {
    this.cartService.removerElementosCarrito(producto);
  }

  

  }


