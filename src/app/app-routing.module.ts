import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';

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
        loadChildren: () => import('./components/film-detail/film-detail.module').then(m => m.FilmsDetailModule)
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
