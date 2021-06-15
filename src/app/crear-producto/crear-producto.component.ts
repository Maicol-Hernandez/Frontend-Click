import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService } from '../servicios/client.service';
import { NegociosService } from '../servicios/negocios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  form: FormGroup;
  idNegocio;
  infoImg;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client : ClientService,
    private negocioService : NegociosService
  ) { }

  ngOnInit(): void {

    this.negocioService.idcrearproducto$.subscribe(dataId => {
      this.idNegocio = dataId
      console.log("De aqui sacaremos el ID", this.idNegocio)
    })

    this.form = this.fb.group({
      iva: ['',Validators.required],
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
      img: [null],
    })
  }
  upload(event) {
    if(event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png'){
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        img: file
      });
      this.infoImg = event.target.files[0].name;
      this.form.get('img').updateValueAndValidity()
      var nombre = this.form.get('nombre').value
      this.infoImg = nombre.trim();
      var remplazo = this.infoImg.split(" ").join("")
      this.infoImg = remplazo
      }
    }


  crearProducto(data:any){
    this.client.postRequestEnviarProductoCreado('http://localhost:5000/api/v02/user/crearProducto',data).subscribe(
      (response:any)=>{
        Swal.fire(
          'Se aguardo correctamente el producto!',
          'Tu producto se encuentra en su negocio',
          'success'
        )
        this.route.navigate(['/zona-administracion']);
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'lo sentimos, No tenemos servicio'
        })
        this.route.navigate(['/zona-administracion']);
      }
    )
  }
  OnSubmit(){
    if(this.form.valid){
        var formData: any = new FormData();
        formData.append("img", this.form.get('img').value);
        formData.append("name", this.infoImg);
        this.client.postRequestEnviarProductoCreado('http://localhost:8000/uploadProducto',formData).subscribe(
        (response:any)=>{
          let data = {
            iva : this.form.value.iva,
            idnegocio : this.idNegocio[0].id,
            nombre : this.form.value.nombre,
            precio : this.form.value.precio,
            logo : response.img 
            }
            this.crearProducto(data);
        },(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'lo sentimos, No se puede actualizar la imagen'
          })
        })
    }else{
      console.log("estado",false)
    }
  }
}