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
  id;
  

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

  async onSubmit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id += params.get('id')
      let data = {"id ": this.id}

      this.client.postRequestEmpresaId('http://localhost:5000/api/v01/user/datosempresaid',data).subscribe(
      (data): any => {
        this.id = data['data']
        console.log("Ok",data['data'])
        
    
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
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#010B30"
      },
      "shape": {
        "type": "circle",
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
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#5B566E",
        "opacity": 0.4,
        "width": 1.5
      },
      "move": {
        "enable": true,
        "speed": 4,
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
