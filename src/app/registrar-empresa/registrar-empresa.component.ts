import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styleUrls: ['./registrar-empresa.component.css']
})
export class RegistrarEmpresaComponent implements OnInit {
  form: FormGroup;
  @ViewChild("foto", {
    read: ElementRef
  }) foto: ElementRef;
  data:any;
  infoImg : any;
  status : boolean = false;
  nameEmpresa:any;
  mostrarError = false;
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
      img : [null],
    });
  }
  
  upload(event) {
    if(event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg' ){
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        img: file
      });
      this.infoImg = event.target.files[0].name;
      this.form.get('img').updateValueAndValidity()
      this.mostrarError = false;
      this.status = true;
      var nombre = this.form.get('nombreEmpresa').value
      this.infoImg = nombre.trim();
      var remplazo = this.infoImg.split(" ").join("")
      this.infoImg = remplazo
      }
    }
    
    


  //metodo que se va encargar de enviar la informacion a la base de datos
  registrarEmpresaDB(data:any){
      this.client.postRequestFormularioEmpresa('http://localhost:5000/api/v01/user/registerEmpresa',data).subscribe(
      (response:any)=>{
        Swal.fire({
          position: 'top-end',
          title: 'Se registro exitosamente!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.route.navigate(['/'])
        });
      },
      (error)=>{
        console.error(error);
      }
      )   
      
  }
  OnSubmit(){

    if (this.form.valid) {
          
          var formData: any = new FormData();
          formData.append("img", this.form.get('img').value);
          formData.append("nombreEmpresa", this.infoImg);
            this.client.postRequestFormularioEmpresa('http://localhost:8000/upload',formData).subscribe(
          (response:any)=>{
            var data:any = {
              nombre :  this.form.value.nombreEmpresa,
              tipoE : this.form.value.tipoEmpresa,
              direccionE : this.form.value.DireccionEmpresa,
              numeroE : this.form.value.NumeroEmpresa,
              numeroS : this.form.value.NumeroSecundario,
              emailE : this.form.value.emailEmpresa,
              horario : this.form.value.Horario,
              logo : response.img //LO que obtenga de la respuesta
              }
              this.registrarEmpresaDB(data);
          },
            (error)=>{
            console.error(error);
          }
        )
      
     }
  }
}
