import { Component } from '@angular/core';

interface Lugar {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent {

  lugares: Lugar[] = [
    {
      titulo: 'Bar Bolera',
      descripcion: 'Ven a visitar a Larry al Bar Bolera.',
      lngLat: [ -0.24707921004741706, 39.16390193155365 ]

    },
    {
      titulo: 'Consum',
      descripcion: 'Tu superrmercado de confianza.',
      lngLat: [-0.24653774344903923, 39.16279829126398 ]
    },
    {
      titulo: 'Pub OK',
      descripcion: 'Donde tomarte unas copas por la noche.',
      lngLat: [ -0.24609128538801883, 39.16234556446696 ]
    },
  ]

}
