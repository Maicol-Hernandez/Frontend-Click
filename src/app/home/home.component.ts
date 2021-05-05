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
  id;

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


}
