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

    /*this.router.params.subscribe(parametros => {
      this.service.obtenerNegocioPorId(Number(parametros.id))
      .subscribe(negocio =>
        this.negocioData = negocio);
      });*/
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

  eliminarNegocioId(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Deseas eliminar un negocio?',
      text: "si tienes productos te aconsejo que elimine todos los productos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar mi negocio',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.client.deleteRequestEliminarNegocioId('http://localhost:5000/api/v02/user/eliminarNegocio', id).subscribe(
          (data): any => {
          this.mensajeEliminacionNegocio = data["data"]
          swalWithBootstrapButtons.fire(
            'ELiminado!',
            'EL negocio se ha eliminado exitosamente.',
            'success'
          ) 
          this.route.navigate(['/zona-administracion']) 
          },
          (error: any) =>{
            swalWithBootstrapButtons.fire(
              'Upp..',
              'Te aconsejo que elimines primero los productos :)',
              'error'
            )
            this.mostrar = true;
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

  

  //Opciones del Usuario
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

  eliminarProducto(id) {
    this.client.getRequestEliminarProductoId('http://localhost:5000/api/v02/user/eliminarProducto', id).subscribe(
      (data): any => {
        this.mensajeEliminacionProducto = data["data"]
      },
      (error: any) => {
        console.log("Ha ocurrido un error en la llamada")
      })
  }
  
  deleteEveryOneP(id){
    var data = {"idNegocio":id}
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Deseas eliminar todos los productos?',
      text: "Advertencia usted vas a eliminar todos los productos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar mi productos',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.client.deleteRequestEliminarProductos('http://localhost:5000/api/v02/eliminarProduct',data).subscribe(
          (response): any => {
          this.mostrarProductos = false;
          this.mostrar=false;
          swalWithBootstrapButtons.fire(
            'ELiminado!',
            'Los productos se ha eliminado exitosamente ,puedes eliminar tu negocio sin ningun problema.',
            'success'
          )  
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

}

