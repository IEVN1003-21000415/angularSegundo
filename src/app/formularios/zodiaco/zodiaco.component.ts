import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms'; // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})

    // Objeto que asocia cada signo con su imagen
    zodiacImages: { [key: string]: string } = {
      'Rata': 'https://www.clarin.com/img/westernastrology/rata.svg',
      'Buey': 'https://www.clarin.com/img/westernastrology/bufalo.svg',
      'Tigre': 'https://www.clarin.com/img/westernastrology/tigre.svg',
      'Conejo': 'https://www.clarin.com/img/westernastrology/conejo.svg',
      'Dragón': 'https://www.clarin.com/img/westernastrology/dragon.svg',
      'Serpiente': 'https://www.clarin.com/img/westernastrology/serpiente.svg',
      'Caballo': 'https://www.clarin.com/img/westernastrology/caballo.svg',
      'Cabra': 'https://www.clarin.com/img/westernastrology/cabra.svg',
      'Mono': 'https://www.clarin.com/img/westernastrology/mono.svg',
      'Gallo': 'https://www.clarin.com/img/westernastrology/gallo.svg',
      'Perro': 'https://www.clarin.com/img/westernastrology/perro.svg',
      'Cerdo': 'https://www.clarin.com/img/westernastrology/chancho.svg'
    };
  
    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        apaterno: ['', Validators.required],
        amaterno: ['', Validators.required],
        dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
        mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
        sexo: ['', Validators.required]
      });
    }
  
    calcularEdadYSigno() {
      const { dia, mes, anio } = this.form.value;
      const birthDate = new Date(anio, mes - 1, dia);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  
      // Calcula el signo del horóscopo chino
      const chineseZodiacSigns = [
        'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
      ];
      const zodiacIndex = (anio - 4) % 12;
      this.chineseZodiac = chineseZodiacSigns[zodiacIndex];
  
      // Asigna la imagen del signo correspondiente
      this.zodiacImage = this.zodiacImages[this.chineseZodiac];
    }
  }
  
  
}
