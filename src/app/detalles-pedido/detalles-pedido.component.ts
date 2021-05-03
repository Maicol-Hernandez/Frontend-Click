import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ClientService } from '../servicios/client.service';
import { CartService } from '../servicios/cart.service';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
