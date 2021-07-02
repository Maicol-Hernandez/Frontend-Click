import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
    private client: ClientService,
    private negocioService: NegociosService
  ) { }

  ngOnInit(): void {

    this.negocioService.actualizarNegocio$.subscribe(dataNegocio => {
      this.negocioDatos = dataNegocio
      console.log("Este es el negocio que se quiere actualizar", dataNegocio)
    })

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: ['', Validators.required],
      horarios: ['', Validators.required],
      correo: ['', Validators.required],
      img: [null]
    })

  }
  //Evento que nos va permitir hacer la configuracion del envio 
  uploadConfig(event) {
    if (event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        img: file
      });
      this.form.get('img').updateValueAndValidity()
    }
  }
  //Metodo que nos va permitir enviar la actualizacion al servidor de img
  UpdateData(data) {
    this.client.postRequestActualizarEmpresa('http://localhost:5000/api/v02/user/actualizarNegocio', data).subscribe(
      (response: any) => {
        Swal.fire(
          'Se actualizo Correctamente!',
          'Tu negocio ha sido actualizado.',
          'success'
        )
        setTimeout(() => {
          this.route.navigate(['/gestionar-negocio']);
        }, 1000);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'lo sentimos,no tenemos servicio'
        })
      }
    )
  }
  //Metodo que se hace llamado en el formulario
  OnSubmit() {
    if (this.form.valid) {
      let data = {
        idn: this.negocioDatos[0].id,
        nombre: this.form.value.nombre,
        tipo: this.form.value.tipo,
        direccion: this.form.value.direccion,
        telefono1: this.form.value.telefono1,
        telefono2: this.form.value.telefono2,
        horarios: this.form.value.horarios,
        correo: this.form.value.correo,
      }
      console.log(this.negocioDatos[0].logo);
      var formData: any = new FormData();
      formData.append("img", this.form.get('img').value);
      formData.append("nameImg", this.negocioDatos[0].logo)
      this.client.postRequestActualizarEmpresa('http://localhost:8000/uploadUpgrade', formData).subscribe(
        (response: any) => {
          this.UpdateData(data);
        }, (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'lo sentimos, No se puede actualizar la imagen'
          })
        }
      )
    }
  }
}