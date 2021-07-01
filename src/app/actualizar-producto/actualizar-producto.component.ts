import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  form: FormGroup;
  productoDatos;
  nombreProducto;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService,
    private negocioService : NegociosService
  ) { }

  ngOnInit(): void {

    this.negocioService.actualizarProducto$.subscribe(dataProducto => {
      this.productoDatos = dataProducto
      this.nombreProducto = this.productoDatos[0].nombre
      console.log("Este es el producto que se quiere actualizar", 
      
      )
    })
    

    this.form = this.fb.group({
      idProducto: ['',Validators.required],
      nombreProducto: ['',Validators.required],
      precio: ['',Validators.required],
      iva: ['', Validators.required],
      img: [null,Validators.required],
    })
  }

  OnSubmit(){
    if (this.form.valid) {
      let data = {
      idProducto:  this.productoDatos[0].id,
      nombre:  this.form.value.nombreProducto,
      precio: this.form.value.precio,
      iva: this.form.value.iva,
      logo: this.productoDatos[0].foto,
    }
    this.client.postRequestActualizarProducto('http://localhost:5000/api/v02/user/actualizarProducto',data).subscribe(
      (response:any)=>{
        console.log()
        this.updateImg(this.productoDatos[0].foto)
      },
      (error)=>{
        console.log(error.status)
      }
    )
    }
  }
  upload(event) {
    if(event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png'){
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        img: file
      });
      this.form.get('img').updateValueAndValidity()
      }
    }

  updateImg(filename){
    var formData: any = new FormData();
        formData.append("img", this.form.get('img').value);
        formData.append("name",filename);
        this.client.postRequestEnviarProductoCreado('http://localhost:8000/uploadProductUpdate',formData).subscribe(
        (response:any)=>{
          Swal.fire(
            'Se actualizado correctamente el producto!',
            'Tu producto se encuentra actualizado en su negocio',
            'success'
          )
        },(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'lo sentimos, No se puede actualizar la imagen'
          })
        })
  }
}
