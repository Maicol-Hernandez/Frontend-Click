import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreProducto: ['',Validators.required],
      descripcion: ['',Validators.required],
      precio: ['',Validators.required],
      logoProducto: ['',Validators.required],
    })
  }

  OnSubmit(){
    if (this.form.valid) {
      let data = {
      nombre :  this.form.value.nombreEmpresa,
      descripcion : this.form.value.tipoEmpresa,
      precio : this.form.value.DireccionEmpresa,
      logo : this.form.value.NumeroEmpresa,
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
