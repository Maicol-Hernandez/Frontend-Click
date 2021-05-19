import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form:FormGroup;

  constructor(
    public fb:FormBuilder,
    public client: ClientService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroTel: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]

    });
  }

  OnSubmit() {
    if (this.form.valid){
      let data = {
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        tipoDocumento: this.form.value.tipoDocumento,
        numeroTelefono: this.form.value.numeroTel,
        fechaNacimiento: this.form.value.fechaNacimiento,
        email: this.form.value.email,
        password: this.form.value.password
      }
      this.client

    }
    
  }
}
