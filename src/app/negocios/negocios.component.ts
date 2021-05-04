import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {

  dataEmpresa: any;
  dataProducto: any;
  id;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    private route: ActivatedRoute

    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required]
    });

    this.client.getRequestDataEmpresa('http://localhost:5000/api/v01/user/datosempresa').subscribe(
     
    (data): any => {
      this.dataEmpresa = data["data"]
      console.log(data["data"])
      },

      (error: any) => {
        console.log(error)
      })

      this.client.getRequestProductoEmpresa('http://localhost:5000/api/v01/user/productoempresa').subscribe(
        
        (data): any => {
          this.dataProducto = data["data"]
          console.log(data["data"])
        }, 

        (error: any) => {
          console.log(error)
        
        })
      
      }
    
    }
  
  




