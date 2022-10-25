import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  {

  private debounceTimer?: NodeJS.Timeout;

  constructor(

    private placesService: PlacesService,
    private mapService: MapService

  ) { }


  onQueryChanged( query: string = '' ) {

    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout(() => {

      this.placesService.getPlacesByQuery( query );

      this.mapService.deleteRoute();

    }, 500 );
  }

}
