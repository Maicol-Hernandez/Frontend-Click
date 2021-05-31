import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styleUrls: ['./registrar-empresa.component.css']
})
export class RegistrarEmpresaComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreEmpresa : ['',Validators.required],
      tipoEmpresa : ['',Validators.required],
      DireccionEmpresa : ['',Validators.required],
      NumeroEmpresa : ['',Validators.required],
      NumeroSecundario : ['',Validators.required],
      emailEmpresa : ['',Validators.required],
      Horario : ['',Validators.required],
      logo : ['',Validators.required],
    });
  }
  OnSubmit(){
    if (this.form.valid) {
      let data = {
      nombre :  this.form.value.nombreEmpresa,
      tipoE : this.form.value.tipoEmpresa,
      direccionE : this.form.value.DireccionEmpresa,
      numeroE : this.form.value.NumeroEmpresa,
      numeroS : this.form.value.NumeroSecundario,
      emailE : this.form.value.emailEmpresa,
      horario : this.form.value.Horario,
      logo : this.form.value.logo
    }
    this.client.postRequestFormularioEmpresa('http://localhost:5000/api/v01/user/registerEmpresa',data).subscribe(
      (response:any)=>{
        //post de regitro de la empresa
        console.log("funciono");
      },
      (error)=>{
        console.log("error");
      }
    )
     }else{
      //declaramos los variables para validar despues
      var nombreE = this.form.value.nombreEmpresa;
      var tipoE = this.form.value.tipoEmpresa;
      var DireccionE = this.form.value.DireccionEmpresa;
      var NumeroE = this.form.value.NumeroEmpresa;
      var NumeroS = this.form.value.NumeroSecundario;
      var emailE = this.form.value.emailEmpresa;
      var horario = this.form.value.Horario;
      //validamos los campos del formulario
      
      if(emailE == ""){
        document.getElementById('EmailEmpresa1').focus();
        document.getElementById('EmailEmpresa2').innerHTML = "Te hace falta este campo";
      }
      if(horario == ""){
        document.getElementById('Horario').focus();
        document.getElementById('Horario2').innerHTML = "Te hace falta este campo";
      }
      if(NumeroS == ""){
        document.getElementById('NumeroEmpresa3').focus();
        document.getElementById('NumeroEmpresa2').innerHTML = "Te hace falta este campo";
      }

      if(NumeroE == ""){
        document.getElementById('NumeroEmpresa0').focus();
        document.getElementById('NumeroEmpresa1').innerHTML = "Te hace falta este campo";
      }

      if(DireccionE == ""){
        document.getElementById('DireccionEmpresa').focus();
        document.getElementById('DireccionEmpresa2').innerHTML = "Te hace falta este campo";
      }

      if(tipoE == ""){
        document.getElementById('card').focus();
        document.getElementById('exampleInputTipoEmpresa2').innerHTML = "Te hace falta este campo";
      }

      if(nombreE == ""){
        document.getElementById('exampleInputNombreEmpresa1').focus();
        document.getElementById('exampleInputNombreEmpresa2').innerHTML = "Te hace falta este campo";
      }
     }

  }
}
