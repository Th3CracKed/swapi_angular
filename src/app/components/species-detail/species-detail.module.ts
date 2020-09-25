import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SpeciesDetailComponent } from './species-detail.component';

@NgModule({
    declarations: [
        SpeciesDetailComponent
    ],
    imports: [SharedModule],
    exports: [
        SpeciesDetailComponent
    ]
})
export class SpeciesDetailModule { }
