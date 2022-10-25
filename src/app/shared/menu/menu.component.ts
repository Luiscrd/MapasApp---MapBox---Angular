import { Component } from '@angular/core';

interface MenuItem {
  ruta: string,
  nombre: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

 menuItems: MenuItem[] = [
  {
    ruta: 'fullscreen',
    nombre: 'FullScreen'
  },
  {
    ruta: 'searchroutes',
    nombre: 'Buscar Rutas'
  },
  {
    ruta: 'zoomrange',
    nombre: 'Zoom Range'
  },
  {
    ruta: 'marcadores',
    nombre: 'Marcadores'
  },
  {
    ruta: 'propiedades',
    nombre: 'Propiedades'
  },
 ]

}
