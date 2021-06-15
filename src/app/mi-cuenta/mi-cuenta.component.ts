import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { CustomvalidatorsService } from '../servicios/customvalidators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service'

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
 
  form: FormGroup;
  load: boolean = true;

public info;
 public nombre=this.auth.getCourrentUser()
 public apellido=this.auth.getCouurrentUserApellidos()
 public documento=this.auth.getCourrentUserNumeroDocumento()
 public  tel=this.auth.getCourrentUserNumeroTelefono()
 public fechanac=this.auth.getCourrentUserFechaNacimiento()
 public correo=this.auth.getCourrentUserCorreo()
 
  
  constructor(
    public fb: FormBuilder,
    public client: ClientService,
    public route: Router,
    private validatorCustom: CustomvalidatorsService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    var nombres=this.auth.getCourrentUser
   console.log(nombres)
      this.form = this.fb.group({
      nombres:   ['',  Validators.required],
      apellidos: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      numeroTel: ['', Validators.required],
      correo: ['', Validators.email]
    },
      {
        validator: this.validatorCustom.MachPassword('password', 'confirmPassword')
      }
    );
  }
  OnSubmit() {
    if (this.form.valid) {
    console.log(this.form.value.nombres)
      this.load = false;
      this.client.postRequestRegistroUsers('http://localhost:5000/api/v01/actualizarUser', {
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        telefono: this.form.value.numeroTel,
        correo: this.form.value.correo
        
      }).subscribe(

        (reponse: any) => {
          this.load = true;
          console.log("Se actualizo", reponse)
          this.auth.setCourrentUser(reponse.nombre);
          this.auth.setCourrentUserApellidos(reponse.apellidos);
          this.auth.setCourrentUserNumeroTelefono(reponse.numero)

          Swal.fire({
            position: 'top-end',
            title: 'Se actualizo exitosamente!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.route.navigate(['/'])
          });
        });
      (error) => {
        console.log(error.status);
      }
    } else {

      console.log("Form error....")
    }
  }

  

  deleteUser(data){
  let info = {"correo":data}
  this.client.postDeleteUser('http://localhost:5000/api/v01/deleteUser',info).subscribe(
    (response)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'se elimino correctamente ,gracias por todo!!',
        showConfirmButton: false,
        timer: 1500
      })
      this.auth.logout()
      this.route.navigate(['/'])
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'lo sentimos debes eliminar todos los negocios!',
      })
      this.route.navigate(['zona-administracion'])
    }
  )
  }
}


