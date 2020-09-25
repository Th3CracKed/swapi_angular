import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { VehiclesListComponent } from './vehicles-list.component';

@NgModule({
    declarations: [
        VehiclesListComponent
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    exports: [
        VehiclesListComponent
    ]
})
export class VehiclesListModule { }
