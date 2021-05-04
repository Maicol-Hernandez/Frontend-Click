import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../interfaces/item.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {


  private carrito = new BehaviorSubject<Array<IItem>>(null); //Definimos nuestro BehaviorSubject, este debe tener un valor inicial siempre
  public datoCarrito = this.carrito.asObservable(); //Tenemos un observable con el valor actual del BehaviourSubject
  constructor() { }
  
  public enviarCarrito(newData: IItem) {
    //Obtenemos el valor actual
    let listCarrito = this.carrito.getValue();
    //Si no es el primer item del carrito
    if(listCarrito){
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCarrito.findIndex((obj => obj.id == newData.id));
      //Si ya cargamos uno aumentamos su cantidad
      if(objIndex != -1){
        listCarrito[objIndex].cantidad += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCarrito.push(newData);
      }
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCarrito = [];
      listCarrito.push(newData);
    }
    this.carrito.next(listCarrito); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
  }
  public removerElementoCarrito(newData:IItem){
    //Obtenemos el valor actual de carrito
    let listCarrito = this.carrito.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCarrito.findIndex((obj => obj.id == newData.id));
    if(objIndex != -1){
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
      listCarrito[objIndex].cantidad = 1;
      //Eliminamos el item del array del carrito
      listCarrito.splice(objIndex,1);
    }
    this.carrito.next(listCarrito); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
  }

}
