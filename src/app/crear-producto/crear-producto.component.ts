import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  form: FormGroup;
  idNegocio;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService,
    private negocioService : NegociosService
  ) { }

  ngOnInit(): void {

    this.negocioService.idcrearproducto$.subscribe(dataId => {
      this.idNegocio = dataId
      console.log("De aqui sacaremos el ID", this.idNegocio)
    })

    this.form = this.fb.group({
      idn: ['',Validators.required],
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      precio: ['',Validators.required],
      logo: ['',Validators.required]
    })
  }

  OnSubmit(){
    if (this.form.valid) {
      let data = {
      idnegocio : this.form.value.idn,
      nombre : this.form.value.nombre,
      descripcion : this.form.value.descripcion,
      precio : this.form.value.precio,
      logo : this.form.value.logo
    }
    this.client.postRequestEnviarProductoCreado('http://localhost:5000/api/v02/user/crearProducto',data).subscribe(
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