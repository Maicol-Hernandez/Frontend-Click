import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

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
