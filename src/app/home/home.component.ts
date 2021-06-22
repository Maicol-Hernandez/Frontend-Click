import { Component, OnInit } from '@angular/core';
import  { ClientService } from '../servicios/client.service'; 
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { Router } from '@angular/router';


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
    private ruta: Router ) { }

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


}
