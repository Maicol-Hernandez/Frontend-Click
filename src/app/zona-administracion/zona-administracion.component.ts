import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zona-administracion',
  templateUrl: './zona-administracion.component.html',
  styleUrls: ['./zona-administracion.component.css']
})
export class ZonaAdministracionComponent implements OnInit {

  datosNegocio;
  negocio;
  productos;

  constructor(
    private client: ClientService,
    private negocioService: NegociosService
  ) { }

  ngOnInit(): void {

    this.client.getRequestMostrarNegocios('http://localhost:5000/api/v02/user/mostrarNegocios').subscribe(
        (data): any => {
          this.datosNegocio = data["Datos"]
          console.log("Datos del negocios: ",this.datosNegocio);
        },

        (error: any) => {
          console.log(error)
        })
  }


  negocioId(id){
    this.client.getRequestMostrarNegocioId('http://localhost:5000/api/v02/user/mostrarNegocioId', id).subscribe(
    (data): any => {
      this.negocio = data["data"]
      console.log("Datos mostrar negocio: ",this.negocio)
      this.negocioService.negocioPorId.emit({
        data:this.negocio

      });
    },
    (error: any) => {
      console.log("Ha ocurrido un error en la llamada")
    }
    )


    this.client.getRequestMostrarProductos('http://localhost:5000/api/v02/user/mostrarProductos', id).subscribe(
      (data): any => {
        this.productos = data["data"]
        console.log(this.productos)
        this.negocioService.productosNegocio.emit({
          data:this.productos
        })
      },
      (error: any) => {
        console.log("Ha ocurrido un error en la llamada")
      }
    )
  }
}

