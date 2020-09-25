import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PlanetDetailComponent } from './planet-detail.component';

@NgModule({
    declarations: [
        PlanetDetailComponent
    ],
    imports: [SharedModule],
    exports: [
        PlanetDetailComponent
    ]
})
export class PlanetDetailModule { }
