import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-rutas',
  templateUrl: './search-rutas.component.html',
  styleUrls: ['./search-rutas.component.css']
})
export class SearchRutasComponent {

  constructor(

    private placesService: PlacesService

  ) { }

    get isUserLocationReady() {

      return this.placesService.isUserLocationReady

    }

}
