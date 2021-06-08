import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-negocio',
  templateUrl: './actualizar-negocio.component.html',
  styleUrls: ['./actualizar-negocio.component.css']
})
export class ActualizarNegocioComponent implements OnInit {

  form: FormGroup;
  negocioDatos;
  nombre;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService,
    private negocioService : NegociosService
  ) { }

  ngOnInit(): void {

    this.negocioService.actualizarNegocio$.subscribe(dataNegocio => {
      this.negocioDatos = dataNegocio
      console.log("Este es el negocio que se quiere actualizar", dataNegocio)
    })

    this.form = this.fb.group({
      idn: ['',Validators.required],
      nombre: ['',Validators.required],
      tipo: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono1: ['',Validators.required],
      telefono2: ['',Validators.required],
      horarios: ['',Validators.required],
      correo: ['',Validators.required],
      logo: ['',Validators.required]
    })

  }

  OnSubmit(){
    if (this.form.valid) {
      let data = {
      idn :  this.form.value.idn,
      nombre :  this.form.value.nombre,
      tipo : this.form.value.tipo,
      direccion : this.form.value.direccion,
      telefono1 : this.form.value.telefono1,
      telefono2 : this.form.value.telefono2,
      horarios : this.form.value.horarios,
      correo : this.form.value.correo,
      logo : this.form.value.logo
    }
    this.client.postRequestActualizarEmpresa('http://localhost:5000/api/v02/user/actualizarNegocio',data).subscribe(
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
