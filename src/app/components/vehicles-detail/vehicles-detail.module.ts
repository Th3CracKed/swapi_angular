import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { VehiclesDetailComponent } from './vehicles-detail.component';

@NgModule({
    declarations: [
        VehiclesDetailComponent
    ],
    imports: [SharedModule],
    exports: [
        VehiclesDetailComponent
    ]
})
export class VehiclesDetailModule { }
