import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { PlanetDetailComponent } from './components/planet-detail/planet-detail.component';
import { SpeciesDetailComponent } from './components/species-detail/species-detail.component';
import { SpeciesListComponent } from './components/species-list/species-list.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { VehiclesDetailComponent } from './components/vehicles-detail/vehicles-detail.component';
import { StarshipsListComponent } from './components/starships-list/starships-list.component';
import { StarshipsDetailComponent } from './components/starships-detail/starships-detail.component';

export const routes: Routes = [
  { path: '', component: ResourcesListComponent },
  {
    path: 'films',
    children: [
      {
        path: '', component: FilmsListComponent,
        loadChildren: () => import('./components/films-list/films-list.module').then(m => m.FilmsListModule)
      },
      {
        path: ':id', component: FilmDetailComponent,
        loadChildren: () => import('./components/film-detail/film-detail.module').then(m => m.FilmDetailModule)
      }
    ]
  },
  {
    path: 'characters',
    children: [
      {
        path: '', component: PeopleListComponent,
        loadChildren: () => import('./components/people-list/people-list.module').then(m => m.PeopleListModule)
      },
      {
        path: ':id', component: PeopleDetailComponent,
        loadChildren: () => import('./components/people-detail/people-detail.module').then(m => m.PeopleDetailModule)
      }
    ]
  },
  {
    path: 'planets',
    children: [
      {
        path: '', component: PlanetsListComponent,
        loadChildren: () => import('./components/planets-list/planets-list.module').then(m => m.PlanetListModule)
      },
      {
        path: ':id', component: PlanetDetailComponent,
        loadChildren: () => import('./components/planet-detail/planet-detail.module').then(m => m.PlanetDetailModule)
      }
    ]
  },
  {
    path: 'species',
    children: [
      {
        path: '', component: SpeciesListComponent,
        loadChildren: () => import('./components/species-list/species-list.module').then(m => m.SpeciesListModule)
      },
      {
        path: ':id', component: SpeciesDetailComponent,
        loadChildren: () => import('./components/species-detail/species-detail.module').then(m => m.SpeciesDetailModule)
      }
    ]
  },
  {
    path: 'vehicles',
    children: [
      {
        path: '', component: VehiclesListComponent,
        loadChildren: () => import('./components/vehicles-list/vehicles-list.module').then(m => m.VehiclesListModule)
      },
      {
        path: ':id', component: VehiclesDetailComponent,
        loadChildren: () => import('./components/vehicles-detail/vehicles-detail.module').then(m => m.VehiclesDetailModule)
      }
    ]
  },
  {
    path: 'starships',
    children: [
      {
        path: '', component: StarshipsListComponent,
        loadChildren: () => import('./components/starships-list/starships-list.module').then(m => m.StarshipsListModule)
      },
      {
        path: ':id', component: StarshipsDetailComponent,
        loadChildren: () => import('./components/starships-detail/starships-detail.module').then(m => m.StarshipsDetailModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
