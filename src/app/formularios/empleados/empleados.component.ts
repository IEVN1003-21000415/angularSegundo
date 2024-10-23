import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export default class EmpleadosComponent {
  matricula: string = '';
  nombre: string = '';
  correo: string = '';
  edad: number | null = null;
  horasTrabajadas: number | null = null;
  empleados: any[] = [];

  agregarEmpleado() {
    if (this.matricula && this.nombre && this.correo && this.edad && this.horasTrabajadas !== null) {
      const { horasxpagar, extras, total, subtotal } = this.calcularPago(this.horasTrabajadas);
      const empleado = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        horasxpagar, 
        extras,
        subtotal,
        total
      };
      this.empleados.push(empleado);
      this.guardarEnLocalStorage();
      this.resetForm();
    }
  }

  modificarEmpleado() {
    const index = this.empleados.findIndex(emp => emp.matricula === this.matricula);
    if (index !== -1) {
      const { horasxpagar, extras, total, subtotal } = this.calcularPago(this.horasTrabajadas!);
      this.empleados[index] = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        horasxpagar,
        extras,
        subtotal,
        total
      };
      this.guardarEnLocalStorage();
      this.resetForm();
    } else {
      alert("Empleado no encontrado");
    }
  }

  eliminarEmpleado() {
    this.empleados = this.empleados.filter(emp => emp.matricula !== this.matricula);
    this.guardarEnLocalStorage();
  }


  calcularPago(horas: number) {
    const tarifaNormal = 70;
    const tarifaExtra = 140;
    
    // Calcular horas normales y horas extras
    let horasNormales = horas > 40 ? 40 : horas;
    let horasExtras = horas > 40 ? horas - 40 : 0;
    
   
    let horasxpagar = horasNormales * tarifaNormal;
    
    
    let subtotal = horasxpagar; 
    
    
    let extras = horasExtras * tarifaExtra;
    
    let total = subtotal + extras; 

    return { horasxpagar, extras, subtotal, total };
  }

  calcularTotalPagos(): number {
    return this.empleados.reduce((acc, empleado) => acc + empleado.total, 0);
  }

  guardarEnLocalStorage() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarDesdeLocalStorage() {
    const data = localStorage.getItem('empleados');
    if (data) {
      this.empleados = JSON.parse(data);
    }
  }

  ngOnInit() {
    localStorage.removeItem('empleados');
    this.empleados = [];
  }

  resetForm() {
    this.matricula = '';
    this.nombre = '';
    this.correo = '';
    this.edad = null;
    this.horasTrabajadas = null;
  }
}
