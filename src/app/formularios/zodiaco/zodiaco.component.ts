import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent {
  formularioInformacionPersonal: FormGroup;
  edad: number | null = null;
  signoZodiacalChino: string | null = null;
  imagenSignoZodiacalChino: string | null = null;
  saludo: string | null = null;

  constructor(private fb: FormBuilder) {
    this.formularioInformacionPersonal = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      sexo: ['', Validators.required]
    });
  }

  calcularEdadYSigno() {
    const dia = this.formularioInformacionPersonal.get('dia')?.value;
    const mes = this.formularioInformacionPersonal.get('mes')?.value;
    const anio = this.formularioInformacionPersonal.get('anio')?.value;
    const nombre = this.formularioInformacionPersonal.get('nombre')?.value;
    const apellidoPaterno = this.formularioInformacionPersonal.get('apellidoPaterno')?.value;
    const apellidoMaterno = this.formularioInformacionPersonal.get('apellidoMaterno')?.value;

    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    this.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      this.edad--;
    }

    this.signoZodiacalChino = this.obtenerSignoZodiacalChino(anio);
    this.imagenSignoZodiacalChino = this.obtenerImagenSignoZodiacalChino(this.signoZodiacalChino);
    this.saludo = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
  }

  obtenerSignoZodiacalChino(anio: number): string {
    const signosZodiacalesChinos = [
      'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragon', 'Serpiente', 'Caballo', 'Cabra',
      'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];
    const indice = (anio - 1900) % 12;
    return signosZodiacalesChinos[indice];
  }

  obtenerImagenSignoZodiacalChino(signo: string): string {
    const imagenesZodiacales: { [key: string]: string } = {
      'Rata': 'https://www.clarin.com/img/westernastrology/rata.svg',
      'Buey': 'https://www.clarin.com/img/westernastrology/bufalo.svg',
      'Tigre': 'https://www.clarin.com/img/westernastrology/tigre.svg',
      'Conejo': 'https://www.clarin.com/img/westernastrology/conejo.svg',
      'Dragon': 'https://www.clarin.com/img/westernastrology/dragon.svg',
      'Serpiente': 'https://www.clarin.com/img/westernastrology/serpiente.svg',
      'Caballo': 'https://www.clarin.com/img/westernastrology/caballo.svg',
      'Cabra': 'https://www.clarin.com/img/westernastrology/cabra.svg',
      'Mono': 'https://www.clarin.com/img/westernastrology/mono.svg',
      'Gallo': 'https://www.clarin.com/img/westernastrology/gallo.svg',
      'Perro': 'https://www.clarin.com/img/westernastrology/perro.svg',
      'Cerdo': 'https://link-a-imagen-cerdo'
    };
    return imagenesZodiacales[signo] || '';
  }
}
