import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SpeciesListComponent } from './species-list.component';

@NgModule({
    declarations: [
        SpeciesListComponent
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    exports: [
        SpeciesListComponent
    ]
})
export class SpeciesListModule { }
