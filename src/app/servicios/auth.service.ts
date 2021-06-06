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

  setCourrentUser(nombres: string): void {
    localStorage.setItem('courrentUserNombres', nombres);
  }
  getCourrentUser(): string {
    return localStorage.getItem('courrentUserNombres');
  }
  private daleteCourrentUser(): void {
    localStorage.removeItem('courrentUserNombres');
  }
  setCourrentUserApellidos(apellidos: string): void {
    localStorage.setItem('courrentUserApellidos', apellidos);
  }
  getCouurrentUserApellidos(): string {
    return localStorage.getItem('courrentUserApellidos');
  }
  private daleteCourrentUserApellidos(): void {
    localStorage.removeItem('courrentUserApellidos');
  }
  setCourrentUserCorreo(correo: string): void {
    localStorage.setItem('courrentUserCorreo', correo);
  }
  getCourrentUserCorreo(): string {
    return localStorage.getItem('courrentUserCorreo');
  }
  private daleteCourrentUserCorreo(): void {
    localStorage.removeItem('courrentUserCorreo');
  }
  setCourrentUserTipoDocumento(tipo_documento: string): void {
    localStorage.setItem('courrentUserTipoDocumento', tipo_documento);
  }
  getCourrentUserTipoDocumento(): string {
    return localStorage.getItem('courrentUserTipoDocumento');
  }
  private daleteCourrentUserTipoDocumento(): void {
    localStorage.removeItem('courrentUserTipoDocumento');
  }
  setCourrentUserNumeroDocumento(numero_documento: string): void {
    localStorage.setItem('courrentNumeroDocumento', numero_documento);
  }
  getCourrentUserNumeroDocumento(): string {
    return localStorage.getItem('courrentNumeroDocumento');
  }
  private daleteCourrentUserNumeroDocumento(): void {
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
  setCourrentUserFechaNacimineto(fecha_nacimiento: string): void {
    localStorage.setItem('courrentUserFechaNacimiento', fecha_nacimiento);
  }
  getCourrentUserFechaNacimineto(): string {
    return localStorage.getItem('courrentUserFechaNacimiento');
  }
  private daleteCourrentUserFechaNacimineto(): void {
    localStorage.removeItem('courrentUserFechaNacimiento');
  }
  setCourrentUserNumeroTelefono(numero_telefono: string): void {
    localStorage.setItem('courrentUserNumeroTelefono', numero_telefono);
  }
  getCourrentUserNumeroTelefono(): string {
    return localStorage.getItem('courrentUserNumeroTelfono');
  }
  private daleteCourrentUserNumeroTelefono(): void {
    localStorage.removeItem('courrentUserNumeroTelfono');
  }


  logout(): void {
    localStorage.removeItem('token');
    this.daleteCourrentUser();
    this.daleteCourrentUserApellidos();
    this.daleteCourrentUserCorreo();
    this.daleteCourrentUserFechaNacimineto();
    this.daleteCourrentUserIdUsario();
    this.daleteCourrentUserTipoDocumento();
    this.daleteCourrentUserNumeroDocumento();
    this.daleteCourrentUserNumeroTelefono();
    this.isLogin.next(false);

  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }
}
