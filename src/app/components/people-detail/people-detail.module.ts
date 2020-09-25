import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PeopleDetailComponent } from './people-detail.component';

@NgModule({
    declarations: [
        PeopleDetailComponent
    ],
    imports: [SharedModule],
    exports: [
        PeopleDetailComponent
    ]
})
export class PeopleDetailModule { }
