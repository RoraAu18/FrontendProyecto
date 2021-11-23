import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  clienteForm: FormGroup;
  titulo: string = "Crear Cliente";
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private aRouter: ActivatedRoute) {
    this.clienteForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.esEditar();
  }

  agregarCliente() {

    const CLIENTE: cliente = {
      cedula: this.clienteForm.get('cedula')?.value,
      nombre: this.clienteForm.get('nombre')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
      correo: this.clienteForm.get('correo')?.value,
    }

    if(this.id !== null){
      //editar un cliente
      this.clienteService.editarCliente(this.id, CLIENTE).subscribe(data => {
        this.toastr.info('El cliente se actualizó correctamente!', 'Cliente actualizado!');
        this.router.navigate(['/listar-cliente']);
      }, error => {
        console.log(error);
        this.clienteForm.reset();
      })

    }else{
      //agregamos un cliente
      console.log(CLIENTE);
      this.clienteService.guardarCliente(CLIENTE).subscribe(data => {
        this.toastr.success('El cliente se registró correctamente!', 'Cliente registrado!');
        this.router.navigate(['/listar-cliente']);
      }, error => {
        console.log(error);
        this.clienteForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Cliente";
      this.clienteService.obtenerCliente(this.id).subscribe(data => {
        this.clienteForm.setValue({
          cedula: data.cedula,
          nombre: data.nombre,
          direccion: data.direccion,
          telefono: data.telefono,
          correo: data.correo
        })
      })
    }
  }
}