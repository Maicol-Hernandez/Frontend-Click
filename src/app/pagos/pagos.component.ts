import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { AuthService } from '../servicios/auth.service';
import { CarritoClickService} from '../servicios/carrito-click.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SIMULADOR } from '../catwalkSimulation.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  payPalC : boolean = false;
  payUC : boolean =  false;
  mercadoPagosC : boolean = false;
  nombre = "Camilo";
  formPayU : FormGroup;
  formPayPal : FormGroup;
  formMercadoPago : FormGroup;
  constructor( 
    public carro : CarritoClickService,
    public client: ClientService,
    public auth: AuthService,
    private fb : FormBuilder,
    private router : Router,
    ) { }

  ngOnInit(): void {
    
    this.formPayU = this.fb.group({
      numberTarjeta : ['',Validators.required],
      fecha  : ['',Validators.required],
      csc  : ['',Validators.required],
      nombre  : ['',Validators.required],
      apellidos  : ['',Validators.required],
      direccion : ['',Validators.required],
      subDireccion : ['',Validators.required],
      ciudad : ['',Validators.required],
      codigoPostal : ['',Validators.required],
      numeroTelefonico : ['',Validators.required],
      email : ['',Validators.required],
    });

    this.formPayPal = this.fb.group({
      email : ['', Validators.email],
      password : ['', Validators.required]
    });

    this.formMercadoPago = this.fb.group({
      numberTarjeta : ['',Validators.required],
      nombres : ['',Validators.required],
      fecha : ['',Validators.required],
      numeroDocumento : ['',Validators.required],
      csc : ['',Validators.required]
      
    });


    this.carro.init();
    console.log(this.carro.carritoUser.getValue());
    console.log(this.carro.sumCarritoUser.getValue());
  }
  async enviarPayU(){
    if(this.formPayU.valid){
      this.validacion(this.formPayU.value.numberTarjeta,this.formPayU.value.csc);
    }else{
      console.log(false);
    }
  }
  
  async enviarPayPal(){
    if(this.formPayPal.valid){
      let data = {
        email: this.formPayPal.value.email,
        password: this.formPayPal.value.password
      }
      this.client.postRequestLogin('http://localhost:5000/api/v01/user/login', data).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Se validaron los datos',
            imageUrl: './static/spinner.gif',
            imageWidth: 300,
            imageHeight: 200,

          }).then(() => {
            this.router.navigate(['/factura'])
          });
          
          console.log("Login:ok", response);

          this.auth.login(response.token);

          this.auth.setCourrentUserIdUsario(response.id_usuario);

          this.auth.setCourrentUser(response.nombres);
          
          this.auth.setCourrentUserCorreo(response.correo);
          
          this.auth.setCourrentUserNumeroTelefono(response.numero_telefono);

        },

        (error) => {
          console.error("Registrese", error)
        });

      this.validacion(this.formPayPal.value.email,this.formPayPal.value.password);

    }
  }

  async enviarMercadoPago(){
    if(this.formMercadoPago.valid){
      this.validacion(this.formMercadoPago.value.numberTarjeta,this.formMercadoPago.value.csc);
    }else{
      console.log(false);
    }
  }
  //Metodo de validacion de pasarela de pagos 
  validacion(users,info){
    for (const user of SIMULADOR) {
      if(user.users == users && user.csc == info){
        this.router.navigate(['/factura']);
        break;
      }else{
        console.log("no existe",false);
      }
    }
  }



  //Metodo que nos permite ocultar
  clickPaypal(){
    if (this.payPalC) {
      this.payUC = false;
      this.mercadoPagosC = false;
      this.payPalC = false;
    } else {
      this.payPalC = true;
      this.payUC = false;
      this.mercadoPagosC = false;
    }
  }
  clickPayU(){
    if (this.payUC) {
      this.payUC = false;
      this.mercadoPagosC = false;
      this.payPalC = false;
    } else {
      this.payPalC = false;
      this.payUC = true;
      this.mercadoPagosC = false;
    }
  }
  clickMercadoPagos(){
    if (this.mercadoPagosC) {
      this.payUC = false;
      this.mercadoPagosC = false;
      this.payPalC = false;
    } else {
      this.payPalC = false;
      this.payUC = false;
      this.mercadoPagosC = true;
    }
  }
}
