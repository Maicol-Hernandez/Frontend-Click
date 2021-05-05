import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { ClientService } from '../servicios/client.service';
import {AuthService} from '../servicios/auth.service';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})
export class DetalleproductoComponent implements OnInit {

  id;
  idProducto;

  constructor(
    private route: ActivatedRoute, 
    private client: ClientService,
    public auth : AuthService
    ){}

  ngOnInit(): void {
    //Variable que trae la informacion del localStorage
    var data = JSON.parse(this.auth.getPedidos());
    console.log("Este son detalles ",data); 
  }   
  }


