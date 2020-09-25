import { Component } from '@angular/core';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routes = [
    { path: '', label: 'Home' },
    { path: 'films', label: 'Films' },
    { path: 'characters', label: 'Characters' },
    { path: 'planets', label: 'Planets' },
    { path: 'species', label: 'Species' },
    { path: 'vehicles', label: 'Vehicles' },
    { path: 'starships', label: 'Starships' }
  ];
}
