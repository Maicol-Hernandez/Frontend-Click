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

  getRequestProductoEmpresa(route: string, token?: string){
    let config:any = {
      responseType: "json"
    }

    if(token){
      const herder = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      config['herders'] = herder
    }

    return this.http.get(route, config);
  }

  postRequestEmpresaId(route:string, id:any, token?:string ) {
    let config:any = {
      reponseType: "json"
    }
  if(token) {
    const herder = new Headers().set('Authorization',  `Bearer ${token}`)
    config['herder'] = herder;
 
  }

  return this.http.post(route, id, config)
  }

  postRequestId(route:string, id:any, token?:string) {
    let config:any = {
      responseType: "json"
    }
    if(token) {
      const herder = new Headers().set('Authorization',  `Bearer ${token}`)
      config['herder'] = herder;
    }
    return this.http.post(route, id, config);
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

  
  postRequestEnviarProductos(route:string, id:any, token?:string) {
    let config:any = {
      responseType: "json"
    }
    if(token) {
      const herder = new Headers().set('Authorization',  `Bearer ${token}`)
      config['herder'] = herder;
    }
    return this.http.post(route, id, config);
  }


}
