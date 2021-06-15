import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { CarritoClickService} from '../servicios/carrito-click.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SIMULADOR } from '../catwalkSimulation.model';
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


      this.validacion(this.formPayPal.value.email,this.formPayPal.value.password);

    }else{
      console.log(false);
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
