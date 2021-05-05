import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  setPedido(pedidos : any){
    localStorage.setItem('pedido',JSON.stringify(pedidos))
  }
  getPedidos():any{
    return localStorage.getItem('pedido')
  }

}
