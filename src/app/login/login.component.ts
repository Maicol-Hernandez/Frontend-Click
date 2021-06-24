import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  hide: boolean = true;
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage: string = "";
  loading: boolean = false;
  correo: string = "";

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public client: ClientService,
    public auth: AuthService,
    public route: Router
  ) { }

  mostrarVar() {
    console.log("Correo (" + this.correo + ")")
  }


  ngOnInit(): void {
    this.form = this.fb.group({

      email: ['', [Validators.required, Validators.pattern(this.isValidEmail), Validators.minLength(15)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  async onSubmit() {

    if (this.form.valid) {

      let data = {
        email: this.form.value.email,
        password: this.form.value.password

      }
      this.loading = true;
      this.client.postRequestLogin('http://localhost:5000/api/v01/user/login', data).subscribe(

        (response: any) => {

          this.loading = false;

          Swal.fire({
            title: '¡ Bienvenido !',
            imageUrl: './static/bienve.svg',
            imageWidth: 400,
            

          }).then(() => {

            this.route.navigate(['/'])

          });

          console.log("Login:ok", response);

          this.auth.login(response.token);

          this.auth.setCourrentUser(response.nombres);

          this.auth.setCourrentUserApellidos(response.apellidos);

          this.auth.setCourrentUserCorreo(response.correo);

          this.auth.setCourrentUserNumeroDocumento(response.numero_documento);

          this.auth.setCourrentUserTipoDocumento(response.tipo_documento);

          this.auth.setCourrentUserFechaNacimiento(response.fecha_nacimiento);

          this.auth.setCourrentUserNumeroTelefono(response.numero_telefono);

          localStorage.setItem('token', JSON.stringify(response.token));
          console.log(localStorage.getItem('token'));

        },

        (error) => {
          this.loading = false;
          if (error.error.status) {
            this.errorMessage = error.error.status
          }

        });

    } else {

      console.log("Form error...")

    }

  }

  getErrorMessange(field: string): string {
    let messege;

    if (this.form.get(field).errors.required) {
      console.log("DATOS DESPUES DEL IF: ", this.form.get(field))
      messege = 'Ingrese un valor valido.'

    } else if (this.form.get(field).hasError('pattern')) {
      messege = 'El email no es valido.'

    } else if (this.form.get(field).hasError('minlength')) {
      const minLength = this.form.get(field).errors?.minlength.requiredLength;

      messege = `Este campo debe tener mas de ${minLength} caracteres.`
    }

    return messege;
  }

  isValidField(field: string): boolean {
    return (
      (this.form.get(field).touched || this.form.get(field).dirty) && !this.form.get(field).valid
    );

  }


}
