import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';

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
      console.log(dataNegocio)
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
    this.client.deleteRequestEliminarNegocioId('http://localhost:5000/api/v02/user/eliminarNegocio', id).subscribe(
      (data): any => {
        this.mensajeEliminacionNegocio = data["data"]
        console.log(this.mensajeEliminacionNegocio)
        this.route.navigate(['/zona-administracion'])
      },
      (error: any) =>{
        console.log("Ha ocurrido un error en la llamada")
      })
  }

  

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
}

