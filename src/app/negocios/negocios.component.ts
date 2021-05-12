import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../servicios/cart.service';
import { IItem } from '../interfaces/item.interface';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {

  dataEmpresa: any;
  dataProducto: any;
  id;
  form: FormGroup;

  //public listaProductos:Array<IItem>[]

  public abrirCart:boolean = false;

  //Esta variable es donde vamos a guardar los datos de cada compra
  public detallesFact : Array<IItem>=[];

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    private route: ActivatedRoute,
    public cartService : CartService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cantidad: [1, Validators.required]
    });

    this.client.getRequestDataEmpresa('http://localhost:5000/api/v01/user/datosempresa').subscribe(
     
    (data): any => {
      this.dataEmpresa = data["data"]
      },

      (error: any) => {
        console.log(error)
      })

      this.client.getRequestProductoEmpresa('http://localhost:5000/api/v01/user/productoempresa').subscribe(
        
        (data): any => {
          this.dataProducto = data["data"]
        }, 

        (error: any) => {
          console.log(error)
        
        })
      
      }
/*
      //Mediante un id traemos la informacion 
      delente(id:any){
      //Variable que nos ayudara a recorrer el array
        var i = 1;
        // traemos los objetos que estan guradados en el localstorage 
        var data = JSON.parse(this.cartService.getPedidos());
        //Guardamos en la variable de detallesFact
        this.detallesFact = data;
        //console.log(this.detallesFact);
        for (const info  of this.detallesFact) { 
          //Si el id de info es igual al que estan registrados;
          if(info.id == id){
            //Elimine este dato
               this.detallesFact.splice(i,1)
               //console.log(this.detallesFact)
               //Guardamos los cambios en el localStorage
               //this.cartService.setPedido(this.detallesFact);
          }
          i++    
        }
      }
      */
  
      async OnSubmit(id:IItem){
        if(this.form.valid){
          //Creamos un nuevo valor ,para luego utilizar
          var cantidad = this.form.value.cantidad;
          var i = 1;
          //Recorremos los producto
          for (const add of this.dataProducto){
          //Creamos una nueva variable con un objeto ya seleccion
          var producto = this.dataProducto[i];
          //Si el id es igual al que se mando por parametros 
          if(add.id == id){
            //Agregamos un nuevo campo (cantidad) donde se va almecenar la cantidad
            producto.cantidad = cantidad;
            this.detallesFact.push(producto);
            console.log("this.detallesFact: ",this.detallesFact);
            //Guardamos en el token;
            this.cartService.setPedido(this.detallesFact);
          }
          i++
          }
        }else{
          console.log("Error")
        }
      }

  /*  async agragarCarrito(producto:IItem){
      if(this.form.valid){
        var cantidad = this.form.value.cantidad;
        console.log("cantidad: ", cantidad)
        var i = 1;
        for (const add of this.dataProducto){
         var producto = this.dataProducto[i];
         //console.log("producto: ", producto)
         if(add.id == id){
          producto.cantidad = cantidad
          //console.log("producto: ", producto.cantidad)
          this.detallesFact.push(producto);
          //console.log("this.detallesFact: ",this.detallesFact)
          this.cartService.setPedido(this.detallesFact);
          console.log("this.detallesFact: ",this.detallesFact)
          
          console.log("producto: ",producto)
    
        }
        i++
        }
      }
    }
*/
    cart() {
      this.abrirCart = !this.abrirCart;
    }



    }
  
  




