import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  constructor(

    private placesService: PlacesService,
    private mapService: MapService

  ) { }
  ngAfterViewInit(): void {

    if ( !this.placesService.userLocation ) throw new Error('No hay placesService.userLocation')
    console.log(this.placesService.userLocation);

    const map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.userLocation,
      zoom: 15
    });

    const popup = new mapboxgl.Popup()
    .setHTML(`
    <h6>Aquí estoy</h6>
    <span>Estoy en este lugar del mundo</span>
    `);

    new mapboxgl.Marker({ color: '#237e10'})
    .setLngLat( this.placesService.userLocation )
    .setPopup( popup )
    .addTo( map );

    this.mapService.setMap( map );

  }



}
