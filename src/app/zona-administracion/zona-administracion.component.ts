import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-zona-administracion',
  templateUrl: './zona-administracion.component.html',
  styleUrls: ['./zona-administracion.component.css']
})
export class ZonaAdministracionComponent implements OnInit {

  datosNegocio;
  negocio;
  productos;
  mostrar = false;
  ensayo :any = [];

  constructor(
    private client: ClientService,
    private negocioService: NegociosService,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    let data = {
      "correo": this.auth.getCourrentUserCorreo()
    }
    this.client.getRequestMostrarNegocios('http://localhost:5000/api/v02/user/mostrarNegocios',data).subscribe(
        (data): any => {
          this.datosNegocio = data["Datos"]
          this.ensayo = data["Datos"]
          this.mostrar = true;
        },
        (error: any) => {
          console.log(error)
        })
  }


  negocioId(id){
    this.client.getRequestMostrarNegocioId('http://localhost:5000/api/v02/user/mostrarNegocioId', id).subscribe(
    (data): any => {
      this.negocio = data["data"]
      console.log(this.negocio)
      this.negocioService.negocio$.emit(this.negocio)
      /*this.negocioService.negocioPorId.emit({
        data:this.negocio
      })*/
    },
    (error: any) => {
      console.log("Ha ocurrido un error en la llamada")
    })


    this.client.getRequestMostrarProductos('http://localhost:5000/api/v02/user/mostrarProductos', id).subscribe(
      (data): any => {
        this.productos = data["data"]
        console.log(this.productos)
        this.negocioService.producto$.emit(this.productos)
        /*this.negocioService.productosNegocio.emit({
          data:this.productos
        })*/
      },
      (error: any) => {
        console.log("Ha ocurrido un error en la llamada")
      })
  }
}

