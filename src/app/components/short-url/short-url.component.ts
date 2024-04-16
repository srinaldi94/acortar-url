import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShortUrlService } from '../../services/short-url.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-short-url',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './short-url.component.html',
  styleUrl: './short-url.component.css'
})
export class ShortUrlComponent {

  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService){
    this.nombreUrl = "";
    this.urlShort = "";
    this.textError = "";
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
  }

  procesarUrl(){
    if(this.nombreUrl === ""){
      this.error("Por favor ingrese una URL");
      return
    }

    this.loading = true;
    this.urlProcesada = false;

    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);

  }

  obtenerUrlShort(){
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe( data => {
      this.loading = false;
      this.urlProcesada = true;
      this.urlShort = data.link
    }, error => {
      this.loading = false;
      this.nombreUrl = ""; 
      if(error.error.description === "The value provided is invalid."){
        this.error("La url ingresada es invalida");
      }
    });
  }

  error(valor: string){
    this.mostrarError = true;
    this.textError = valor;
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }

}
