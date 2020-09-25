import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {
  resources = [
    { display: 'Films', value: 'films' },
    { display: 'People', value: 'characters' },
    { display: 'Planets', value: 'planets' },
    { display: 'Species', value: 'species' },
    { display: 'Vehicles', value: 'vehicles' },
    { display: 'Starships', value: 'starships' }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
