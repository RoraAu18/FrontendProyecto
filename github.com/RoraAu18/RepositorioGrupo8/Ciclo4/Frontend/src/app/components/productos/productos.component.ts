import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { producto } from '../../models/producto'
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  csvArchivo: any[] = [];
  listProducto: producto[] = [];
  header: boolean = false;

  constructor(private ngxCsvParser: NgxCsvParser,
              private productoService: ProductosService,) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: any) => {
        console.log('Result', result);
        this.csvArchivo = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    }

    obtenerProductos() {
      this.productoService.getProductos().subscribe(data => {
        console.log(data);
        this.listProducto = data;
      }, error => {
        console.log(error);
      })
    }
    eliminarProducto(id: any) {
      this.productoService.eliminarProductos(id).subscribe(data => {
        this.obtenerProductos();
      }, error => {
        console.log(error);
      })
    }
}