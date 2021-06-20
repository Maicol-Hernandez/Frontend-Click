import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { CarritoClickService } from '../servicios/carrito-click.service';
import { element } from 'protractor';
import { strict } from 'assert';
import { stringify } from '@angular/compiler/src/util';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  
  tablas = [];
  paid : boolean = false;
  pays : boolean = true;
  total : any;
  form: FormGroup;
  idNegocio;
  nombres;
  correo;
  numTelefono;
  id_usuario;
  valorPedido;
  idPedido;
  datosDetalles: any = [];

  constructor(
    public carro: CarritoClickService,
    public fb: FormBuilder,
    public auth: AuthService,
    public route: Router,
    public client: ClientService,
  ) { }

  ngOnInit(): void {
    
    this.client.getRequestPedirIdPedido('http://localhost:5000/api/v02/user/pedidoid').subscribe(
      (data): any => {
       this.idPedido = data['datos_pedido']
       console.log("ID DEL PEDIDO: ", this.idPedido)
      }, 
      (error: any) => {
        console.error(error)

      });
    
    this.form = this.fb.group({
      iva: ['', Validators.required]
    });
    
    this.carro.init();
    
    this.carro.sumIva.getValue()
    this.carro.sumProducto.getValue()
    this.idNegocio = localStorage.getItem('id_negocio')
    this.nombres = localStorage.getItem('courrentUserNombres')
    this.correo = localStorage.getItem('courrentUserCorreo')
    this.numTelefono = localStorage.getItem('courrentUserNumeroTelefono')
    this.id_usuario = localStorage.getItem('courrentUserIdUsuario')  
/*
    let data = {
      iva: this.carro.sumIva.getValue(),
      ValorTotal: this.carro.sumProducto.getValue(),
     fecha: new Date().toLocaleString(),
     id_negocio: this.idNegocio,
     nombre: this.nombres,
     correo: this.correo,
     telefono: this.numTelefono,
    }
    console.log("Valor del data: ", data)
*/
    this.carro.listado.map(a =>{[
        this.tablas.push(
          {
            columns: [
              [
                {
                  text:a.nombre,
                  bold:true,
                },
              ],[
                {
                  text: a.cantidad , alignment: 'center' 
                },
              ],
              [
                {
                  text: '$ '+parseInt(a.precio) , alignment: 'right' 
                },
              ]

            ]
          },
        )
      ]
    });
  }



 async enviarPedido() {

  let data = {
    iva: this.carro.sumIva.getValue(),
    valorTotal: this.carro.sumProducto.getValue(),
    fecha: new Date().toISOString(),
    id_negocio: this.idNegocio,
    id_usuario: this.id_usuario,
  }
  
  //console.log("ESTE ES EL VALOR DE DATA:", data)
  this.client.postRequestPedido('http://localhost:5000/api/v02/user/pedido', data).subscribe(
    (response:any) => {
  
      Swal.fire({
        title: 'Se pago correctamente',
        imageUrl: 'https://media0.giphy.com/media/ZZYXNDxMcMDXIblV8L/source.gif',
        imageWidth: 400,
        imageHeight: 200,

      }).then(() => {
        //this.route.navigate(['/detallesproducto'])
      });

      console.log(response)
    },
    (error) => {
      console.error(error);
    });

  }


  async enviarPedidoDetalles() {
    this.valorPedido = this.carro.carritoUser.getValue()
     //var iva = this.carro.carritoUser.getValue()
     /*for (let ivaDetalle of this.valorPedido){
      this.iva = (ivaDetalle.precio * ivaDetalle.iva )/100
      console.log("this.iva, dentro del for: ", this.iva)
     }
     
     console.log("this.iva, fuera del for : ", this.iva)
     */

     this.datosDetalles;
    for (let item of this.valorPedido) {
      
      var iva = (item.precio * item.iva )/100
      //console.group("Este es el valor del iva detalles :", iva)
      
      this.datosDetalles.push(
        `{` + 
        `id: ${item.id} ` + 
        `nombre: ${item.nombre} ` + 
        `precio: ${item.precio} ` + 
        `cantidad: ${item.cantidad} ` + 
        `iva: ${iva} ` +`}` 
        )

    }
    
    console.log(
      `datosDetalles: ${this.datosDetalles}`
      )  
      let data = {
        pedidoDetalles: this.datosDetalles
      }      

      console.log(`data: ${data}`) 

      this.client.postRequestEnviarPedidoDetalles('http://localhost:5000/api/v02/user/pedidodetalles', data).subscribe(
        (response: any) => {
          console.log(response)
        },
        (error) => {
          console.error(error)
          
        }
      )


    //console.log("Este es el valor del pedido:", this.valorPedido)
    //console.log("Detalle del producto: ")
  }
  
  pay(){
    this.paid = true;
    this.pays  = false;
  }

  generatePdf(options){
    let documentDefinition = { 
      content: [
      {
        text: 'PROYECTO CLICK',
        fontSize: 16,
        alignment: 'center',
        color: '#0000',
        margin: [0,30]
      },
      {
        text: 'FACTURA DE LA COMPRA',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        
        color: 'skyblue'
      },
      {
        text: 'Información',
        style: 'sectionHeader',
        margin: [0,20],
      },
      ,
        {
          columns: [
            [
              {
                text: `Nombre: ${this.nombres}`,
                bold:true,
              },
              { text: `Correo: ${this.correo}` ,bold:true,},
              { text: `Numero: ${this.numTelefono}` ,bold:true,},
            ],
            [
              {
                text: `Fecha : ${new Date().toLocaleString()}`,
                alignment: 'right',
              },
            ]
          ]
        },
        {
          text: 'Detalles de los productos',
          margin: [0,10]
        },
        {
          columns: [
            [
              {
                text:"Productos",
                margin: [0,10],
                fillColor: '#555555'
              },
            ],[
              {
                text: "Cantidad" ,
                alignment: 'center',
                margin: [0,10] 
              },
            ],
            [
              {
                text: "Precio" ,
                alignment: 'right',
                margin: [0,10],
              },
            ]
  
          ] 
        },    
        this.tablas, 
        {
          text: "I.V.A : $ "+this.carro.sumIva.getValue(),
          margin: [50,60,0,0],
          fontSize: 20,
        },
        {
          text: 'Total : $ '+this.carro.sumCarritoUser.getValue(),
          margin: [50,10],
          fontSize: 20,
        },
        { qr: 'https://www.google.com/' ,fit: '50' },
        {
          ul: [
            'El pedido se puede devolver en un máximo de 10 días .',
            'La garantía del producto estará sujeta a los términos y condiciones del fabricante.',
            'Esta es una factura generada por el sistema.',
          ],
      }
      ],
    };
    switch (options) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        console.log("error");
        break;
    }
   }

}
