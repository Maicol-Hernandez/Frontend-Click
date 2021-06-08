import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClientService } from '../servicios/client.service';


@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  @Output() negocioPorId: EventEmitter<any> = new EventEmitter();

  @Output() productosNegocio: EventEmitter<any> = new EventEmitter();

  negociocomprar$ = new EventEmitter<Array<any>>();

  productocomprar$ = new EventEmitter<Array<any>>();

  negocio$ = new EventEmitter<Array<any>>();

  producto$ = new EventEmitter<Array<any>>();

  idcrearproducto$ = new EventEmitter<Array<any>>();

  actualizarNegocio$ = new EventEmitter<Array<any>>();

  crearProducto$ = new EventEmitter<Array<any>>();

  actualizarProducto$ = new EventEmitter<Array<any>>();

  constructor(
    private http: HttpClient,
    private client: ClientService,
  ) { }

  /*negocios1 = this.administracion.datosNegocio;

  negocio2 = this.client.get<Array<datos>>('http://localhost:5000/api/v02/user/mostrarNegocios')

  negocios = this.http.get<Array<datos>>('http://localhost:5000/api/v02/user/mostrarNegocios');

  obtenerNegocioPorId(idParametro: number): Observable<ZonaAdministracionComponent> {
    return this.negocios1.pipe(
      map(response => response.find(negocio => negocio.id === idParametro))
    )
  }*/


}
