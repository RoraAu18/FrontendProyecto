export class producto {
    _id?: number;
    codigo_producto: number;
    nombre_producto: String;
    nitproveedor: number;
    precio_compra: number;
    ivacompra: number;
    precio_venta: number;

    constructor(codigo_producto: number, nombre_producto: String,  nitproveedor: number, precio_compra: number, ivacompra: number, precio_venta: number) {

        this.codigo_producto = codigo_producto;
        this.nombre_producto = nombre_producto;
        this.nitproveedor = nitproveedor;
        this.precio_compra = precio_compra;
        this.ivacompra = ivacompra;
        this.precio_venta = precio_venta;
    }
}