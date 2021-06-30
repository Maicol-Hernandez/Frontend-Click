import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { ClientService } from '../servicios/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  paid: boolean = false;
  pays: boolean = true;
  total: any;
  form: FormGroup;
  idNegocio;
  nombres;
  correo;
  numTelefono;
  id_usuario;
  idPedido;
  fecha;


  constructor(
    public carro: CarritoClickService,
    public fb: FormBuilder,
    public auth: AuthService,
    public route: Router,
    public client: ClientService,
  ) { }

  ngOnInit(): void {

    const meses = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ]
    
    const date = new Date()
    const dia = date.getDate()
    const mes = date.getMonth()
    const year = date.getFullYear()
    const hora = date.getHours()
    const minutos = date.getMinutes()

    this.fecha = `${dia} de ${meses[mes]} del ${year}` 

    this.carro.init();

    console.log(this.carro.sumIva.getValue());
    this.carro.sumProducto.getValue()
    this.idNegocio = localStorage.getItem('id_negocio')
    this.nombres = localStorage.getItem('courrentUserNombres')
    this.correo = localStorage.getItem('courrentUserCorreo')
    this.numTelefono = localStorage.getItem('courrentUserNumeroTelefono')
    this.id_usuario = localStorage.getItem('courrentUserIdUsuario')

    this.carro.listado.map(a => {
      [
        this.tablas.push(
          {
            columns: [
              [
                {
                  text: a.nombre,
                  bold: true,
                },
              ], [
                {
                  text: a.cantidad, alignment: 'center'
                },
              ],
              [
                {
                  text: '$ ' + parseInt(a.precio), alignment: 'right'
                },
              ]

            ]
          },
        )
      ]
    });
  }


  async enviarPedido() {
    console.log(this.carro.sumIva.getValue())
    let data = {
      iva: this.carro.sumIva.getValue(),
      valorTotal: this.carro.sumProducto.getValue(),
      fecha: new Date().toLocaleString(),
      id_negocio: this.idNegocio,
      id_usuario: this.id_usuario,
    }

    this.client.postRequestPedido('http://localhost:5000/api/v02/user/pedido', data).subscribe(
      (response: any) => {
        let idPedido = response['id_pedido']
        this.auth.setCourrentPedido(response.id_pedido)

        let valorPedido = this.carro.carritoUser.getValue()
        var productosDetalles: any = []

        for (let item of valorPedido) {
          var iva = (item.precio * item.iva) / 100

          let detalles = {
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad,
            iva: iva,
            idPedido: idPedido
          }

          console.log(`idPedido ${idPedido}`)
          console.log(detalles)

          productosDetalles.push(detalles)
        }

        let data = {
          pedidoDetalles: productosDetalles
        }

        this.client.postRequestEnviarPedidoDetalles('http://localhost:5000/api/v02/user/pedidodetalles', data).subscribe(
          (response: any) => {

            Swal.fire({
              title: 'Se pago correctamente',
              imageUrl: 'https://media0.giphy.com/media/ZZYXNDxMcMDXIblV8L/source.gif',
              imageWidth: 400,
              imageHeight: 200,

            }).then(() => {

            });
            console.log(response)

          },
          (error) => {
            console.error(error);
          });

        console.log(response)

      },
      (error) => {
        console.error(error);
      });

  }

  pay() {
    this.paid = true;
    this.pays = false;
  }

  generatePdf(options) {
    let documentDefinition = {
      content: [
        {
          text: 'PROYECTO CLICK',
          fontSize: 16,
          alignment: 'center',
          color: '#0000',
          margin: [0, 30]
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
          margin: [0, 20],
        },
        ,
        {
          columns: [
            [
              {
                text: `Nombre: ${this.nombres}`,
                bold: true,
              },
              { text: `Correo: ${this.correo}`, bold: true, },
              { text: `Numero: ${this.numTelefono}`, bold: true, },
            ],
            [
              {
                text: `Fecha : ${this.fecha}`,
                alignment: 'right',
              },
            ]
          ]
        },
        {
          text: 'Detalles de los productos',
          margin: [0, 10]
        },
        {
          columns: [
            [
              {
                text: "Productos",
                margin: [0, 10],
                fillColor: '#555555'
              },
            ], [
              {
                text: "Cantidad",
                alignment: 'center',
                margin: [0, 10]
              },
            ],
            [
              {
                text: "Precio",
                alignment: 'right',
                margin: [0, 10],
              },
            ]

          ]
        },
        this.tablas,
        {
          text: "I.V.A : $ " + this.carro.sumIva.getValue(),
          margin: [50, 60, 0, 0],
          fontSize: 20,
        },
        {
          text: 'Total : $ ' + this.carro.sumCarritoUser.getValue(),
          margin: [50, 10],
          fontSize: 20,
        },
        { qr: 'https://www.google.com/', fit: '50' },
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
