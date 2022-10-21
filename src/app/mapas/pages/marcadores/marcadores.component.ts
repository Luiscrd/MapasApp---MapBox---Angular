import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marcador {
  color: string,
  nombre: string,
  marker?: mapboxgl.Marker,
  centro?: [ number, number ]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;

  zoomLevel: number = 18;

  center: [number, number] = [-0.2469526053183915, 39.16374533418829];

  marcadores: Marcador[] = [];

  color: string = '#237e10';

  nombre: string = '';

  count: number = 1;

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();

    this.mapa.on('move', ( event ) => {

      const target = event.target;

      const { lng, lat } = target.getCenter();

      this.center = [ lng, lat ]

    })

  }


  irMarcador( marcador: mapboxgl.Marker ) {

    this.mapa.flyTo({
      center: marcador.getLngLat()
    })

  }

  colorCabio( color:string ) {

    this.color = color;

  }

  nombreCabio( nombre:string ) {

    this.nombre = nombre

  }


  agegarMarcador () {

    if ( this.nombre === '' ) {

      this.nombre = 'Marcador' + this.count;
      this.count += 1;

    }

    const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false, closeButton: false }).setHTML(`<h5>${ this.nombre }</h5>`);

    const nuevoMarcador = new mapboxgl.Marker({ color: this.color, draggable: true })
    .setLngLat( this.center ).setPopup( popup ).addTo( this.mapa )

    this.marcadores.push({
      color: this.color,
      nombre: this.nombre,
      marker: nuevoMarcador
    });

    nuevoMarcador.on('dragend', () => {

      this.guardarMarcadoresLocalStorage()

    })

    this.guardarMarcadoresLocalStorage();

    this.nombre = '';

  }

  borrarMarcador ( index: number ) {

    this.marcadores[ index ].marker?.remove();

    this.marcadores.splice( index, 1 );

    this.guardarMarcadoresLocalStorage();

  }

  guardarMarcadoresLocalStorage () {

    const marcArr: Marcador[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      const nombre = m.nombre;
      const { lng, lat } = m.marker!.getLngLat();

      marcArr.push({
        color,
        nombre,
        centro: [ lng, lat ]
      })

    })

    localStorage.setItem( 'marcadores', JSON.stringify( marcArr ) )

  }

  leerLocalStorage () {

    if ( !localStorage.getItem( 'marcadores') ) {

      return;

    }

    const marcArr: Marcador[] = JSON.parse( localStorage.getItem('marcadores')! );

    marcArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,

      }).setLngLat( m.centro! ).addTo( this.mapa )

      this.marcadores.push({
        color: m.color,
        nombre: m.nombre,
        marker: newMarker,
        centro: m.centro
      })

      newMarker.on('dragend', () => {

        this.guardarMarcadoresLocalStorage()

      })

    })

  }

}
