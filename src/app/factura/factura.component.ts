import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { CarritoClickService } from '../servicios/carrito-click.service';
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

  constructor(
    public carro : CarritoClickService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      iva: ['', Validators.required]
    });
    
    this.carro.init();
    
    this.carro.sumIva.getValue()
    this.carro.sumProducto.getValue()
    this.idNegocio = localStorage.getItem('id_negocio')
    console.log("Este es el valor: ", this.carro.sumIva.getValue())
    
    console.group(
      `Iva : ${this.carro.sumIva.getValue()}`,
      `ValorTotal : ${this.carro.sumProducto.getValue()}`,
      `Fecha : ${new Date().toLocaleString()}`,
      `id_negocio : ${this.idNegocio}`
    )

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
    })
  }
  
  OnSubmit(): void {
    let data = {
      iva: this.form.value.iva
    }
    console.log("Valor del data: ", data)
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
                text: "Nombre :Camilo Chico",
                bold:true,
              },
              { text: "Correo :aguja.2003@gmail.com" ,bold:true,},
              { text: "Numero : 3227340759",bold:true,},
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
