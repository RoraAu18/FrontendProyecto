export class cliente {
    _id?: number;
    cedula: String;
    nombre: string;
    direccion: String;
    telefono: string;
    correo: string;

    constructor(cedula: string,  nombre: string, direccion: string, telefono: string, correo: string) {

        this.cedula = cedula;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
    }
}