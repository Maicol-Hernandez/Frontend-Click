import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.css']
})
export class FormularioPedidoComponent implements OnInit {

  form: FormGroup;

  constructor(
    //public client: ClientService,
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService
  ) { }
  /*Se validan los datos insertados en el frontend*/
  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }
  /*Envio de datos al backend*/
  onSubmit() {
    if (this.form.valid) {
      this.client.postRequestFormularioPedido('http://localhost:5000/api/v01/pedido',{
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        telefono: this.form.value.telefono,
        correo: this.form.value.correo,
        direccion: this.form.value.direccion,
      }).subscribe(
        (response: any) => {
          console.log(response);

          localStorage.setItem('nombres', response.nombres);
          localStorage.setItem('apellidos', response.apellidos);

          console.log(localStorage.getItem('nombres'));
          console.log(localStorage.getItem('apellidos'));

          this.route.navigate(['/inicio'])
        },
        (error) => {
          console.log(error.status)
        })
    } else {
      console.log("Error en el formulario");
    }
  }

}
