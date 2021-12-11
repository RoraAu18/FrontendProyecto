import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  listCliente: cliente[] = [];

  constructor(private clienteService: ClienteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.getClientes().subscribe(data => {
      console.log(data);
      this.listCliente = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarCliente(id: any) {
    this.clienteService.eliminarCliente(id).subscribe(data => {
      this.toastr.error('Cliente eliminado correctamente', 'Cliente eliminado');
      this.obtenerClientes();
    }, error => {
      console.log(error);
    })
  }
}

