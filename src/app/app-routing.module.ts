import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesListComponent } from './resources-list/resources-list.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: ResourcesListComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
