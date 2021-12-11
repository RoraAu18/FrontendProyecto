import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cliente } from '../models/cliente'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url= 'http://localhost:3000/api/clientes/';

  constructor(private http: HttpClient) { }

  getClientes(): Observable <any>{
    return this.http.get(this.url);
  }
  eliminarCliente(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }
  guardarCliente(cliente: cliente): Observable<any>{
    return this.http.post(this.url, cliente);
  }
  obtenerCliente(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }
  editarCliente(id: string, cliente: cliente): Observable<any>{
    return this.http.put(this.url + id, cliente);
  }
}

