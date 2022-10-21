import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;

  zoomLevel: number = 14;

  center: [number, number] = [ -0.2469526053183915, 39.16374533418829 ];

  constructor() { }

  ngOnDestroy(): void {

    this.mapa.off('zoom', () => {});

    this.mapa.off('zoomend', () => {});

    this.mapa.off('move', () => {});

  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', () => {

      this.zoomLevel = this.mapa.getZoom()

    })

    this.mapa.on('zoomend', () => {

      if ( this.mapa.getZoom() > 19 ) {

        this.mapa.zoomTo( 19 )

      }

    })

    this.mapa.on('move', ( event ) => {

      const target = event.target;

      const { lng, lat } = target.getCenter();

      this.center = [ lng, lat ]

    })

  }

  zoomIn() {

    this.mapa.zoomIn()

  }

  zoomOut() {

    this.mapa.zoomOut()

  }

  zoomCabio( valor: string ) {

    this.mapa.zoomTo(Number(valor))

  }

}
