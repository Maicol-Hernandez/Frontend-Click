import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { AuthService } from '../servicios/auth.service'; 
import { CustomvalidatorsService } from '../servicios/customvalidators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {

  hide: boolean = true;
  presse: boolean = true;
  errorMessage: string = ""; 
  form: FormGroup;
  load: boolean = true;

  passwordUser: string = "";
  passwordUser2: string = "";

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    public fb: FormBuilder,
    public client: ClientService,
    public auth: AuthService,
    public route: Router,
    private validatorCustom: CustomvalidatorsService

  ) { }

  mostrarVar() {
    console.log(
      "passwordUser (" + this.passwordUser + ")" +
      "paswordUser2 (" + this.passwordUser2 + ")"
    );

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      apellidos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      tipoDocumento: ['', Validators.required],
      numeroDoc: ['', [Validators.required, Validators.maxLength(10)]],
      numeroTel: ['', [Validators.required, Validators.maxLength(10)]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern), Validators.minLength(12)]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), this.validatorCustom.patternValidator()])],
      confirmPassword: ['', [Validators.required]],

    },

      {

        validator: this.validatorCustom.MachPassword('password', 'confirmPassword')

      }

    );
  }
  /*
      let data = {
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        tipoDocumento: this.form.value.tipoDocumento,
        numeroDocumento: this.form.value.numeroDoc, 
        numeroTelefono: this.form.value.numeroTel,
        fechaNacimiento: this.form.value.fechaNacimiento,
        email: this.form.value.email,
        password: this.form.value.password
      }
*/

  OnSubmit() {
    if (this.form.valid) {

      this.load = false;
      this.client.postRequestRegistroUsers('http://localhost:5000/api/v01/user/registro', {
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        tipoDocumento: this.form.value.tipoDocumento,
        numeroDocumento: this.form.value.numeroDoc, 
        numeroTelefono: this.form.value.numeroTel,
        fechaNacimiento: this.form.value.fechaNacimiento,
        email: this.form.value.email,
        password: this.form.value.password
      }).subscribe(

        (response: any) => {
          this.load = true;
          console.log("Se registro", response)

          Swal.fire({
            position: 'top-end',
            title: 'Se registro exitosamente!',
            showConfirmButton: false,
            timer: 2000

          }).then(() => {
            
            this.route.navigate(['/'])
            
          });

          console.log("Registro ok", response)
          
          //this.auth.login(response.token);
          
        },

        (error) => {
          console.error("error.error.status: ", error.error.status);
          if (error.status) {
            this.errorMessage = error.error.status            
            console.error("this.errorMessagee", this.errorMessage);
        
          }
        
        });

    } else {

      console.log("Form error....")
    }

  }

  /*
    getErrorMessange(messange : string){
  
      if( this.passwordUser != this.passwordUser2 ) {
        messange = "Las contraseñas no coinciden. Vuelve a intentarlo ";
        console.log("Las contraseñas son incorrectas !!" + "passwordUser : " + this.passwordUser + "passwordUser2 : " + this.passwordUser2 )
        
      } else if(this.passwordUser == this.passwordUser2) {
        messange = ""
        console.log("Las contraseñas son iguales!! ", this.passwordUser, this.passwordUser2)
      }else{
        console.log(status.small)
      }
      return messange;
    } 
  
    isValidField(field: string): boolean{
      return(
        (this.form.get(field).dirty || this.form.get(field).touched) && !this.form.get(field).invalid
      );
    }
  */

}

