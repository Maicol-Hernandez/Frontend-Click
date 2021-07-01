import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { AuthService } from '../servicios/auth.service';
import { CarritoClickService} from '../servicios/carrito-click.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SIMULADOR } from '../catwalkSimulation.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ParticlesModule } from 'angular-particle';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  payPalC : boolean = true;
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
            icon:'success',
           

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
  width: number = 100;
  height: number = 100;
  myStyle: Object = {
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'z-index': -1,
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
  };
  myParams: object = {
    "particles": {
      "number": {
        "value": 83, /*cantidad*/ 
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {/*color del circulo*/ 
        "value": "#ff8000"
      },
      "shape": {
        "type": "circle",/*tipo de particula*/
        "polygon": {
          "nb_sides": 7
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 4,/*tamaño de las particulas*/
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      /*circulos o lineas*/ 
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#5B566E",
        "opacity": 0.4,
        "width": 1.5
      },
      "move": {
        "enable": true,
        "speed": 4,/*rapidez */
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };
}
