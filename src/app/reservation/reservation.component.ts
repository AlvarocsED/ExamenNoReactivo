import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation+',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservationForm: FormGroup;
  paradores: any[] | undefined;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.reservationForm = this.fb.group({
      name: new FormControl('', Validators.required),
      hotel: new FormControl('', Validators.required),
      checkInDate: new FormControl('', Validators.required),
      checkOutDate: new FormControl('', Validators.required)
    });


    this.http.get<any[]>('http://moralo.atwebpages.com/paradores/obtenerParadores.php')
      .subscribe(paradores => {
        this.paradores = paradores;
      });
  }

  submitForm() {
    if (this.reservationForm.valid) {

      const checkInDate = new Date(this.reservationForm.value.checkInDate);
      const checkOutDate = new Date(this.reservationForm.value.checkOutDate);
      const today = new Date();

      if (checkInDate <= today || checkOutDate <= checkInDate) {
        alert('Por favor, seleccione fechas válidas.');
        return;
      }


      console.log('Formulario enviado:', this.reservationForm.value);
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }
}
