import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartService {

  estadoInicial = JSON.parse(localStorage.getItem('pedido')) || []
  
   carrito = new BehaviorSubject<Array<IItem>>(this.estadoInicial)

  //public datoCarrito = this.carrito.asObservable()
  

  
  /*
  private carrito = new BehaviorSubject<Array<IItem>>(null); //Definimos nuestro BehaviorSubject, este debe tener un valor inicial siempre
  public datoCarrito = this.carrito.asObservable(); //Tenemos un observable con el valor actual del BehaviourSubject
    */  
  /*
  total = this.carrito.pipe(
  map(items => items.reduce(this.acumulador, 0))    
  );
  
  totalForeach = this.carrito.pipe(
    map(items => {
      
      let acumulado = 0;
      items.forEach(current => {
        acumulado = acumulado + (current.precio * current.cantidad);
      });
      return acumulado;
    })
  );
  
  acumulador(acumuladorVar: number, currentItem: IItem): number {
    return acumuladorVar + (currentItem.precio * currentItem.cantidad);
  }
*/

  
  constructor() { }
  

  getPedidos():any{
    return localStorage.getItem('pedido')
  }  

  public setPedido(detallesFact: any) {
    //Obtenemos el valor actual
    let listCarrito = this.carrito.getValue();
    console.log('listaCarrito:',listCarrito)
    //console.log("datoCarrito", this.datoCarrito)
    //localStorage.setItem('pedido',JSON.stringify(pedido))
    //Si no es el primer item del carrito
    if(listCarrito){
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCarrito.findIndex((obj => obj.id === detallesFact.id));
      //Si ya cargamos uno aumentamos su cantidad
      console.log("objIndex: ", objIndex)
      if(objIndex > -1){
        listCarrito[objIndex].cantidad += 1;
      console.log('listCarrito[objIndex].cantidad += 1:')    
      
    }

    //{producto: cantidad, producto: cantidad}
    /*{"arroz": 1}
carrito["arroz"] = carrito["arroz"]  + 1
{"arroz": 2} */

      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCarrito.push(detallesFact);
      }
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCarrito = [];
      listCarrito.push(detallesFact);
    }

    localStorage.setItem('pedido',JSON.stringify(detallesFact))
    this.carrito.next(listCarrito); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
  
  
  }

  addItem(currentItem: any) {

    // Obteniendo estado del carrito
    const items = [...this.carrito.value];
    console.log("items: ", items)

    // Saber si existe el item, si no existe el index es -1
    const itemIndex = items.findIndex(item => item.id === currentItem.product.id);

    // Si el indice es mayor de -1, el item existe dentro del carrito.
    if (itemIndex > -1) {
      const itemCarritoExistente = items[itemIndex];
      itemCarritoExistente.cantidad = itemCarritoExistente.cantidad + currentItem.cantidad;
      items[itemIndex] = itemCarritoExistente;
    } else {
      // Agregando un item al carrito
      items.push(currentItem);
    }

    // Actualizando el estado del contenedor de carrito, para que le notifique a sus observadores subscritos.
    this.carrito.next(items);
    localStorage.setItem('peidodo', JSON.stringify(items));
  }


  public removerElementosCarrito(newData:IItem){
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
