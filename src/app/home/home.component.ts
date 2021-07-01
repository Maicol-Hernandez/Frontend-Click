import { Component, OnInit } from '@angular/core';
import  { ClientService } from '../servicios/client.service'; 
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { ParticlesModule } from 'angular-particle';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  dataEmpresa;
  id_negocio;

  constructor(
    private client: ClientService,
    private route: ActivatedRoute,
    private ruta: Router,
    public auth: AuthService ) { }

 ngOnInit(): void {


    this.client.getRequestDataEmpresa('http://localhost:5000/api/v01/user/datosempresa').subscribe(

      (data): any => {
        this.dataEmpresa = data['data']
        console.log("exito",this.dataEmpresa)
      },
      (error: any) => {
        console.log(error)
      });

    
  }

  async mostrarNegocio(id) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      id += params.get('id')
      let data = {"id": id}
      localStorage.setItem('id_negocio', id)
      console.log("data:", data)

      this.client.postRequestEmpresaId('http://localhost:5000/api/v01/user/datosempresaid',data).subscribe(
      (data): any => {
        this.id_negocio = data['negocio_id']
        console.log("Ok, este es el id:", data['negocio_id'])
        
      },
      
      (error) => {
        console.log(error.status)
      });

    });


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
