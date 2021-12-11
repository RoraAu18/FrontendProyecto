import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  listClientes: cliente [] = [];
  listProductos: producto [] = [];
  productos_detalle: Array<any> = [];
  total: any= 0;
  grantotal: any= 0;


  venta = {
    cliente: "",
    producto: "",
    cantidad: 0,
    precio: 0,
    iva: 19,
  };

  constructor(private clienteService: ClienteService,
              private productoService: ProductosService ) { }


  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerProductos();
  }

  obtenerClientes() {
    this.clienteService.getClientes().subscribe(data => {
      console.log(data);
      this.listClientes = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  poner_precio(){
    let data = this.venta.producto.split("-");
    this.venta.precio = Number (data[1]);
  }

  agregar(){

    let data = this.venta.producto.split("-");

    let existe = this.productos_detalle.findIndex(e => e.producto_id == data[0])

    this.productos_detalle.push({
      producto_id: data[0],
      producto_nombre: data[2],
      cantidad: this.venta.cantidad,
      precio: this.venta.precio,
      totalventa: this.venta.cantidad * this.venta.precio,
      totaliva: this.venta.cantidad * this.venta.precio * 0.19,
    });

    this.total +=  this.venta.cantidad *= this.venta.precio;
    this.total += this.total * 0.19;
  }
}
