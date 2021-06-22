import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})

export class CarritoClickService {

  //Aqui vamos a guardar el array mediante un BehaviorSubject
  public carritoUser : BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public pedidos = new BehaviorSubject<Array<IItem>>(null);
  public sumCarritoUser : BehaviorSubject<Number> = new BehaviorSubject(null);
  //Suma que nos permite almacenar el total del iva y la suma de los productos
  public sumIva : BehaviorSubject<Number> = new BehaviorSubject(null);
  public sumProducto : BehaviorSubject<Number> = new BehaviorSubject(null);
  public listado :any = []
  public carrito :any;
  constructor() { }

  //Metodo que nos permite editar el localStorage
  setPedido(carrito : any=[]){
    localStorage.setItem('carrito',JSON.stringify(carrito))
  }
  getPedidos():any{
    return localStorage.getItem('carrito')
  }

  //inicializamos los datos ya guardados en el localStorage y los guardamos en BehaviorSubject
  init(){
    var local =JSON.parse(this.getPedidos())
    //Si esta nulo el localStorage . lo configuramos.
    if (local == null) {
      this.setPedido(this.listado);
      this.carritoUser.next(this.listado);
      this.sumCarritoUser.next(0);
    } else {
    //Sino esta nulo guardamos los datos
      this.listado = local;
      this.carritoUser.next(this.listado);
      this.sumCart();
    }
  }

  //metodo para eliminar datos de un BehaviorSubject
  delenteProduct(id:any){
    this.listado = JSON.parse(this.getPedidos());
    var i = 0;
    for (const info  of this.listado) { 
      //Si el id de info es igual al que estan registrados;
      if(info.id == id){
        //Elimine este dato
           this.listado.splice(i,1)
           console.log(this.listado)
           //Guardamos los cambios en el localStorage
           this.setPedido(this.listado);
           this.carritoUser.next(this.listado);
      }
      i++    
    }
  }

  //Buscar los productos repetidos 
  add(producto:any,id): boolean{
      var i = 0;
      for (const select of this.listado) {
        if(select.id == id){
          producto.cantidad = select.cantidad;
          var sum = producto.cantidad + 1;
          producto.cantidad = sum;
          this.listado[i] = producto;
          //Guardar el listado 
          this.carritoUser.next(this.listado);
          this.setPedido(this.listado);
          return false;
        }
        if(this.listado.length == 0){
          //LLamamos la interfaz para tener un orden con interfaces
          this.pedidos.next(producto);
          //Obtenemos el valor la informacion
          var info = this.pedidos.getValue();
          this.listado.push(info);
          this.carritoUser.next(this.listado);
          this.setPedido(this.listado);
          return false;
        }
        i++;
      }
      return true;
}
  //Metodo para agregar los productos al carrito
  addProductCars(id:any,producto,cantidad){
    var i = 0;
    for (const add of producto){
      var asignarProducto = add;
        if(asignarProducto.id == id ){ 
            //Seleccionamos el producto
            this.carrito = asignarProducto;
            //Agregamos un nuevo campo (cantidad) donde se va almecenar la cantidad
            this.carrito.cantidad = cantidad;
            //hacemos un objeto
            producto = {  
              id : this.carrito.id,
              nombre : this.carrito.nombre,
              precio : this.carrito.precio,
              iva  :  this.carrito.iva,
              cantidad : this.carrito.cantidad,
              foto : this.carrito.foto
            }     
            if(this.add(producto,id)){
              this.pedidos.next(producto)
              var info = this.pedidos.getValue();
              this.listado.push(info);
              this.carritoUser.next(this.listado);
              this.setPedido(this.listado);
            }
            }
          }
      }


  //Metodo que nos va permitir hacer la suma el iva  del carrito
  sumCart(){
    var ivas :any=[];
    var cantidades : any = [];
    var sumProduct = 0;
    var sumIvas = 0;
    for (const iterator of this.carritoUser.getValue()){
      var iva = (iterator.precio * iterator.iva)/100;
      var valorTotal = (iterator.cantidad * iterator.precio);
      var productoIva  = iva * iterator.cantidad;
      ivas.push(productoIva);
      cantidades.push(valorTotal);
    }
    for (let i = 0; i < ivas.length; i++) {
      sumIvas += ivas[i];
      sumProduct += cantidades[i]
    }
    this.sumProducto.next(sumProduct);
    this.sumIva.next(sumIvas);
    sumIvas = sumIvas + sumProduct;
    this.sumCarritoUser.next(sumIvas);
  }

  updatedProducts(productServe:any){
    var i = 0;
    this.listado = JSON.parse(this.getPedidos());
    for (const product of productServe) {
      var producto = this.listado[i];
      if(producto != undefined){
        if(producto.iva != product.iva){
          product.cantidad = producto.cantidad;
          this.listado[i] = product;
          this.carritoUser.next(this.listado);
          this.setPedido(this.listado);
        }
      }else{
        break;
      }
      i++;
    }
  }

}
