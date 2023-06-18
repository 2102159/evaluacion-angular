import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public url: string = 'https://jsonserve.vercel.app/';

  constructor(private http: HttpClient) {

  }

  getProducts() {
    return this.http.get(`${this.url}posts`);
  }
  guardarEdicion(body: any) {
    return this.http.post(`${this.url}posts`, body);
  }

  editarObjeto(id: any, body: any) {
    return this.http.put(`${this.url}posts/${id}`, body);
  }

  eliminarObjeto(id: any) {
    return this.http.delete(`${this.url}posts/${id}`);
  }
  actualizarObjeto(body: any) {
    return this.http.post(`${this.url}posts`, body);
  }
}
