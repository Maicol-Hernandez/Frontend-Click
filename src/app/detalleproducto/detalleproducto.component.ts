import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { ClientService } from '../servicios/client.service';

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
    private client: ClientService
    
    ){}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id += params.get('id'); 
      let data = {"id" : this.id}   
      this.client.postRequestId('http://localhost:5000/api/v01/user/productosid',data).subscribe(
      (data): any => {
        this.id = data['data']
        console.log("DATOS QUE LLEGAN", data['data'])
      },

      )

    })
    
  }

  productoId(): void  {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id += params.get('id');    
      this.client.postRequestId('http://localhost:5000/api/v01/user/productosid', this.id).subscribe(
        (data): any =>{
          this.id = data['data']
        }      
      )
    })
  }
    
  }


