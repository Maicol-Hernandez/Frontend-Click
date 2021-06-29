import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import {ClientService} from '../servicios/client.service';
import { AuthService } from '../servicios/auth.service'
@Component({
  selector: 'app-historial-de-pedidos',
  templateUrl: './historial-de-pedidos.component.html',
  styleUrls: ['./historial-de-pedidos.component.css']
})
export class HistorialDePedidosComponent implements OnInit{
  pedidos;
  mostrar=false;
  date : any;
  constructor(
  private param : ActivatedRoute,
  private client :ClientService,
  public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.param.paramMap.subscribe(
      (params : ParamMap)=>{
        let correo:any = params.get('correo');
        let data = {"correo":correo}
        this.client.getHistorialPedidos('http://localhost:5000/api/v02/user/historialPedidos',data).subscribe(
          (data:any)=>{
            this.pedidos = data.data;
            console.log(this.pedidos);
            console.log(this.pedidos[4].fecha)
            console.log("esta es la hora "+new Date(this.pedidos[5].fecha))
            var event = new Date(this.pedidos[0].fecha)
            this.date = JSON.stringify(event)
            this.date = this.date.slice(1,11);
            console.log(this.date);
          },(error)=>{
            console.error(error)
          }
        )

      }
    )
  }
}
