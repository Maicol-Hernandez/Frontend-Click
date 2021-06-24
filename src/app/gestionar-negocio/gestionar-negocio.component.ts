import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-gestionar-negocio',
  templateUrl: './gestionar-negocio.component.html',
  styleUrls: ['./gestionar-negocio.component.css']
})
export class GestionarNegocioComponent implements OnInit , OnDestroy{
  //negocioData;
  datosActualizar;
  datosActualizar1;
  mensajeEliminacionNegocio;
  mensajeEliminacionProducto;
  idNegocio;
  negocioData1;
  productoData1;
  negocioSuscripcion: Subscription;
  productoSuscripcion: Subscription;
  //Eliminar Boton 
  mostrar : boolean = false;
  mostrarProductos : boolean = true;

  constructor(
    private router: ActivatedRoute,
    private client: ClientService,
    private negocioService: NegociosService,
    private route :Router
  ) { }
  public negocioData: any;
  public productosData: any;
  ngOnInit(): void {
    this.negocioService.negocioPorId.subscribe(data => {
      this.negocioData = data
    })

    this.negocioService.productosNegocio.subscribe(data => {
      this.productosData = data
    })

    this.negocioSuscripcion = this.negocioService.negocio$.subscribe( dataNegocio => {
      this.negocioData1 = dataNegocio
    });

    this.productoSuscripcion = this.negocioService.producto$.subscribe( dataProducto => {
      this.productoData1 = dataProducto
      console.log(dataProducto)
    })
  }
  ngOnDestroy(): void {
    this.negocioSuscripcion.unsubscribe();
  }
  actualizarNegocioId(id){
    this.client.getRequestMostrarNegocioId('http://localhost:5000/api/v02/user/mostrarNegocioId', id).subscribe(
      (data): any => {
        this.datosActualizar = data["data"]
        console.log(this.datosActualizar)
        this.negocioService.actualizarNegocio$.emit(this.datosActualizar)
      },
      (error: any) => {
        console.log("Ha ocurrido un error en la llamada")
      })
  }
   //Opciones del Usuario que obtendar mediante con botones en la vista
  crearProducto(id) {
    this.client.getRequestMostrarNegocioId('http://localhost:5000/api/v02/user/mostrarNegocioId', id).subscribe(
      (data): any => {
        this.idNegocio = data["data"]
        this.negocioService.idcrearproducto$.emit(this.idNegocio)
      },
      (error: any) => {
        console.log("Ha ocurrido un error en la llamada")
      })
  }
  actualizarProducto(id) {
    this.client.getRequestProductoId('http://localhost:5000/api/v02/user/productoId', id).subscribe(
      (data): any => {
        this.datosActualizar1 = data["data"]
        this.negocioService.actualizarProducto$.emit(this.datosActualizar1)
      },
      (error: any) => {
        console.log("Ha ocurrido un error en la llamada")
      })
  }
  //Agregar
  //Metodo que nos ayuda a obtener los datos que no fueron eliminados
  mostrarProductosUpdate(id){
    this.client.getRequestMostrarProductos('http://localhost:5000/api/v02/user/mostrarProductos', id).subscribe(
      (data): any => {
        var dataProduct = data["data"]
        console.log(dataProduct)
        this.negocioService.producto$.emit(dataProduct)
      },
      (error: any) => {
        console.log("Ha ocurrido un error en la llamada")
      })
  }
  eliminarProducto(id,fileName) {
    this.mostrarProductos = false
    var idProduct:any = {"id":id}
    this.client.getRequestEliminarProductoId('http://localhost:5000/api/v02/user/eliminarProducto', idProduct).subscribe(
      (data): any => {
        this.mostrarProductos = true;
        this.mensajeEliminacionProducto = data["data"]
        this.mostrarProductosUpdate(this.negocioData1[0].id)
        this.eliminarImg(fileName);
      },
      (error: any) => {
        Swal.fire(
          'Upp..',
          'Lo sentimos no tenemos servicio :(',
          'error'
        )
      })
  }
  eliminarImg(data:any){
    var formData = new FormData();
    formData.append('filename',data)
    this.client.getRequestEliminarProductoId('http://localhost:8000/delete',formData).subscribe(
      (response)=>{
        Swal.fire(
          'Eliminado!',
          'Tu producto ha sido eliminado exitosamente.',
          'success'
        )
      },(error)=>{
        Swal.fire(
          'Upp..',
          'Lo sentimos no se pudo eliminar la imagen :(',
          'error'
        )
      }
    );
  }

  //Metodos que nos permite eliminar el negocio y sus productos
  eliminarNegocioId(id,filename){
    var data = id.idNegocio;
    this.client.deleteRequestEliminarNegocioId('http://localhost:5000/api/v02/user/eliminarNegocio', data).subscribe(
      (response):any =>{
        this.deleteImgNegocio(filename)
        this.route.navigate(['/zona-administracion'])
      },(error:any)=>{
        Swal.fire(
          'Upp..',
          'Lo sentimos no tenemos servicio :(',
          'error'
        )
      }
    )
  }

  
  deleteEveryOnePN(id,filename){
    var data = {"idNegocio":id}
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Deseas eliminar tu negocio?',
      text: "Advertencia usted vas a eliminar tu negocio y tu productos registrados!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar mi negocio',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.client.deleteRequestEliminarProductos('http://localhost:5000/api/v02/eliminarProduct',data).subscribe(
          (response): any => {
          this.mostrarProductos = false;
          this.mostrar=false;
            this.eliminarNegocioId(data,filename)
          },
          (error: any) =>{
            swalWithBootstrapButtons.fire(
              'Upp..',
              'No tenemos un servicio :(',
              'error'
            )
            this.mostrar = true;
          console.error(error)
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Gracias por continuar con click :)',
          'error'
        )
      }
    })
  }
  //Agregar
  deleteImgNegocio(filename){
      var formData= new FormData();
      formData.append('filename',filename)
      this.client.getRequestEliminarProductoId('http://localhost:8000/deleteImgNegocio',formData).subscribe(
        (response)=>{
          Swal.fire(
            'Eliminado!',
            'Tu negocio ha sido eliminado exitosamente.',
            'success'
          )
        },(error)=>{
          Swal.fire(
            'Upp..',
            'Lo sentimos no se pudo eliminar la imagen :(',
            'error'
          )
        }
      );
  }

}

