import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  admin = new BehaviorSubject<boolean>(null);

  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }


  login(token: string): void {
    localStorage.setItem('token', token);
    this.admin.next(true);
    this.isLogin.next(true);

  }
  //id pedido
  setCourrentPedido(id_pedido: string): void {
    localStorage.setItem('courrentUserPedido', id_pedido)
  }
  getCourrentPedido(): string {
    return localStorage.getItem('courrentUserPedido')
  }
  private daleteCourrentPedido(): void {
    localStorage.removeItem('courrentUserPedido')
  }

  setCourrentUser(nombres: string): void {
    localStorage.setItem('courrentUserNombres', nombres);
  }
  getCourrentUser(): string {
    return localStorage.getItem('courrentUserNombres');
  }
  private deleteCourrentUser(): void {
    localStorage.removeItem('courrentUserNombres');
  }
  setCourrentUserApellidos(apellidos: string): void {
    localStorage.setItem('courrentUserApellidos', apellidos);
  }
  getCouurrentUserApellidos(): string {
    return localStorage.getItem('courrentUserApellidos');
  }
  private deleteCourrentUserApellidos(): void {
    localStorage.removeItem('courrentUserApellidos');
  }
  setCourrentUserCorreo(correo: string): void {
    localStorage.setItem('courrentUserCorreo', correo);
  }
  getCourrentUserCorreo(): string {
    return localStorage.getItem('courrentUserCorreo');
  }
  private deleteCourrentUserCorreo(): void {
    localStorage.removeItem('courrentUserCorreo');
  }
  setCourrentUserTipoDocumento(tipo_documento: string): void {
    localStorage.setItem('courrentUserTipoDocumento', tipo_documento);
  }
  getCourrentUserTipoDocumento(): string {
    return localStorage.getItem('courrentUserTipoDocumento');
  }
  private deleteCourrentUserTipoDocumento(): void {
    localStorage.removeItem('courrentUserTipoDocumento');
  }
  setCourrentUserNumeroDocumento(numero_documento: string): void {
    localStorage.setItem('courrentNumeroDocumento', numero_documento);
  }
  getCourrentUserNumeroDocumento(): string {
    return localStorage.getItem('courrentNumeroDocumento');
  }
  private deleteCourrentUserNumeroDocumento(): void {
    localStorage.removeItem('courrentNumeroDocumento');
  }
  setCourrentUserIdUsario(id_usuario: string): void {
    localStorage.setItem('courrentUserIdUsuario', id_usuario);
  }
  getCourrentUserIdUsario(): string {
    return localStorage.getItem('courrentUserIdUsuario');
  }
  private daleteCourrentUserIdUsario(): void {
    localStorage.removeItem('courrentUserIdUsuario');
  }
  setCourrentUserFechaNacimiento(fecha_nacimiento: string): void {
    localStorage.setItem('courrentUserFechaNacimiento', fecha_nacimiento);
  }
  getCourrentUserFechaNacimiento(): string {
    return localStorage.getItem('courrentUserFechaNacimiento');
  }
  private daleteCourrentUserFechaNacimiento(): void {
    localStorage.removeItem('courrentUserFechaNacimiento');
  }
  setCourrentUserNumeroTelefono(numero_telefono: string): void {
    localStorage.setItem('courrentUserNumeroTelefono', numero_telefono);
  }
  getCourrentUserNumeroTelefono(): string {
    return localStorage.getItem('courrentUserNumeroTelefono');
  }
  private deleteCourrentUserNumeroTelefono(): void {
    localStorage.removeItem('courrentUserNumeroTelefono');
  }


  
  logout(): void {
    localStorage.removeItem('token');
    this.deleteCourrentUser();
    this.deleteCourrentUserApellidos();
    this.deleteCourrentUserCorreo();
    this.daleteCourrentUserFechaNacimiento();
    this.daleteCourrentUserIdUsario();
    this.deleteCourrentUserTipoDocumento();
    this.deleteCourrentUserNumeroDocumento();
    this.deleteCourrentUserNumeroTelefono();
    this.daleteCourrentPedido();
    this.isLogin.next(false);

  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }
}
