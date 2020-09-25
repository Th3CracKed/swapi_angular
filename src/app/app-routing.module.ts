import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { PlanetDetailComponent } from './components/planet-detail/planet-detail.component';

const routes: Routes = [
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
        path: '', component: PlanetsListComponent,
        loadChildren: () => import('./components/species-list/species-list.module').then(m => m.SpeciesListModule)
      },
      {
        path: ':id', component: PlanetDetailComponent,
        loadChildren: () => import('./components/species-detail/species-detail.module').then(m => m.SpeciesDetailModule)
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
