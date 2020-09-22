import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { FilmsListComponent } from './components/films-list/films-list.component';

const routes: Routes = [
  { path: '', component: ResourcesListComponent },
  {
    path: 'films', component: FilmsListComponent,
    loadChildren: () => import('./components/films-list/films-list.module').then(m => m.FilmsListModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
