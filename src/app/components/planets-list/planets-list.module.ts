import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PlanetsListComponent } from './planets-list.component';

@NgModule({
    declarations: [
        PlanetsListComponent
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    exports: [
        PlanetsListComponent
    ]
})
export class PlanetListModule { }
