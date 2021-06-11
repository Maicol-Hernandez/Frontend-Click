import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  form: FormGroup;
  productoDatos;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService,
    private negocioService : NegociosService
  ) { }

  ngOnInit(): void {

    this.negocioService.actualizarProducto$.subscribe(dataProducto => {
      this.productoDatos = dataProducto
      console.log("Este es el producto que se quiere actualizar", this.productoDatos)
    })

    this.form = this.fb.group({
      idProducto: ['',Validators.required],
      nombreProducto: ['',Validators.required],
      precio: ['',Validators.required],
      logoProducto: ['',Validators.required],
    })
  }

  OnSubmit(){
    if (this.form.valid) {
      let data = {
      idProducto :  this.form.value.idProducto,
      nombre :  this.form.value.nombreProducto,
      precio : this.form.value.precio,
      logo : this.form.value.logoProducto,
    }
    this.client.postRequestActualizarProducto('http://localhost:5000/api/v02/user/actualizarProducto',data).subscribe(
      (response:any)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error.status)
      }
    )
    }
  }
}
