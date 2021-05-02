import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getRequestDataEmpresa(route: string, token?: string){

    let config:any = {
      responseType: "json"
    }

    if(token){
      const heder =new HttpHeaders().set('Authorization', `Bearer ${token}`)
      config['herders'] = heder
    }


    return this.http.get(route, config);
  }

  /*Servicio del formulario de pedido*/
  postRequestFormularioPedido(route: string, data?:any) {
    let config:any = {
      responseType: "json"
    }
    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["header"] = header;

    return this.http.post(route, data, config);
  }
  postRequestFormularioEmpresa(route: string ,data? :any){
    let config:any = {
      responseType: "json"
    }
    return this.http.post(route,data,config);

  }
}
