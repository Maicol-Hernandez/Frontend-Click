import { Component, OnInit } from '@angular/core';
import { ClientService } from '../servicios/client.service';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoClickService} from '../servicios/carrito-click.service';
import { IItem } from '../interfaces/item.interface';

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

  //public listaProductos:Array<IItem>[]

  public abrirCart:boolean = false;

  //Esta variable es donde vamos a guardar los datos de cada compra
  public detallesFact : Array<IItem>=[];

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    private route: ActivatedRoute,
    public carro : CarritoClickService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cantidad: [1, Validators.required]
    });
    this.carro.init();

    this.client.getRequestDataEmpresa('http://localhost:5000/api/v01/user/datosempresa').subscribe(
     
    (data): any => {
      this.dataEmpresa = data["data"]
      },

      (error: any) => {
        console.log(error)
      })

      this.client.getRequestProductoEmpresa('http://localhost:5000/api/v01/user/productoempresa').subscribe(
        
        (data): any => {
          this.dataProducto = data["data"]
        }, 

        (error: any) => {
          console.log(error)
        
        })
      
      }
     
       //Metodo para agregar en el carrito de compras
       async OnSubmit(id:any){
           //Consumo a un servicio del carro
           this.carro.addProductCars(id,this.dataProducto,1);
           this.carro.sumCart();
       }
    }
  
  




