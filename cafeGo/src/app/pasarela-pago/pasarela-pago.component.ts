import { Component } from '@angular/core';

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.component.html',
  styleUrls: ['./pasarela-pago.component.css']
})
export class PasarelaPagoComponent {

  tarjeta: string = '';
  cvv: string = '';
  fecha: string = '';
  tipoTarjeta: string = '';
  mensajeCorrectoTarjeta: string = '';
  mensajeCorrectoCVV: string = '';
  mensajeCorrectoFecha: string = '';


  mensajePagoExitoso: string ="";

  validarTarjeta(): void {
    const patronTarjeta = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  
    if (patronTarjeta.test(this.tarjeta)) {
      const tipo = this.obtenerTipoTarjeta(this.tarjeta);
      if (tipo !== 'Desconocida') {
        this.tipoTarjeta = tipo;
        this.mensajeCorrectoTarjeta = `${tipo} Correcta`;
      } else {
        this.tipoTarjeta = '';
        this.mensajeCorrectoTarjeta = '';
      }
    } else {
      this.tipoTarjeta = '';
      this.mensajeCorrectoTarjeta = '';
    }
  }

  
  obtenerTipoTarjeta(numeroTarjeta: string): string {
    if (/^4/.test(numeroTarjeta)) {
      return 'Visa';
    } else if (/^3[47]/.test(numeroTarjeta)) {
      return 'Amex';
    } else if (/^5[1-5]/.test(numeroTarjeta)) {
      return 'Mastercard';
    } else if (/^6(?:011|5[0-9]{2})/.test(numeroTarjeta)) {
      return 'Discover';
    } else if (/^(?:2131|1800|35\d{3})/.test(numeroTarjeta)) {
      return 'JCB';
    } else {
      return 'Desconocida';
    }
  }

  validarCVV(): void {
    const cvvRegex = /^\d{3,4}$/;

    if (cvvRegex.test(this.cvv)) {
      this.mensajeCorrectoCVV = 'CVV Correcto';
    } else {
      this.mensajeCorrectoCVV = '';
    }
  }

  validarFecha(): void {
    const fechaRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

    if (fechaRegex.test(this.fecha)) {
      this.mensajeCorrectoFecha = 'Fecha Correcta';
    } else {
      this.mensajeCorrectoFecha = '';
    }
  }



  pagar(){
   this.mensajePagoExitoso="Pago realizado correctamente";
  }

}


