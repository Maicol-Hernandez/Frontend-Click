import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-negocio',
  templateUrl: './actualizar-negocio.component.html',
  styleUrls: ['./actualizar-negocio.component.css']
})
export class ActualizarNegocioComponent implements OnInit {

  form: FormGroup;
  negocioDatos;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nombreNegocio: ['',Validators.required],
      tipoNegocio: ['',Validators.required],
      direccion: ['',Validators.required],
      telefonoPrincipal: ['',Validators.required],
      telefonoSecundario: ['',Validators.required],
      horarios: ['',Validators.required],
      email: ['',Validators.required],
      logo: ['',Validators.required]
    })

  }

  OnSubmit(){
    if (this.form.valid) {
      let data = {
      nombreNegocio :  this.form.value.nombreNegocio,
      tipoNegocio : this.form.value.tipoNegocio,
      direccion : this.form.value.direccion,
      telefonoPrincipal : this.form.value.telefonoPrincipal,
      telefonoSecundario : this.form.value.telefonoSecundario,
      horarios : this.form.value.horarios,
      email : this.form.value.email,
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