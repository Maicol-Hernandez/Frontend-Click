import { Component, OnInit } from '@angular/core';
import  { ClientService } from '../servicios/client.service'; 
import { ActivatedRoute, Data, ParamMap } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  dataEmpresa;

  constructor(
    private client: ClientService,
    private route: ActivatedRoute ) { }

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


  }


}
