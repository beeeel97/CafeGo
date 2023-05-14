export class Usuario{

    IDUsuario: number;
    NombreUsuario: string;
    CorreoUsuario: string;
    PassUsuario: string;

    constructor (IDUsuario:number, NombreUsuario:string, CorreoUsuario:string, PassUsuario:string) {
        this.IDUsuario=IDUsuario;
        this.NombreUsuario=NombreUsuario;
        this.CorreoUsuario=CorreoUsuario;
        this.PassUsuario=PassUsuario;
    }

    

}