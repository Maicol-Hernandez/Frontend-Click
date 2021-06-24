import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ClientService } from '../servicios/client.service';
import { ActivatedRoute,ParamMap } from '@angular/router';
@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  nombreUser;
  apellidoUser
  tipoDoc;
  numeroDoc;
  informacion;
  valorTotal;
  valorIva;
  constructor(
    public auth : AuthService,
    private param : ActivatedRoute,
    private client :ClientService
  ) { }

  ngOnInit(): void {
  this.param.paramMap.subscribe(
    (params:ParamMap)=>{
      let id =+ params.get('noPedido');
      let data = {"id":id}
      this.client.getHistorialPedidos("http://localhost:5000/api/v02/user/detallesPedidos",data).subscribe(
        (data:any)=>{
          let info = data.data;
          this.informacion = info;
          this.nombreUser = info[0].nombreUser;
          this.apellidoUser = info[0].apellido;
          console.log(this.apellidoUser)
          this.tipoDoc = info[0].tipoDoc
          this.numeroDoc = info[0].doc
          this.valorIva =info[0].iva
          this.valorTotal = info[0].valor
        },
        (error)=>{
          console.error(error.status);
        }
      )
    }
  )
  }

}
