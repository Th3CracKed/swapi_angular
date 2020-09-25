import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PeopleListComponent } from './people-list.component';

@NgModule({
    declarations: [
        PeopleListComponent
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    exports: [
        PeopleListComponent
    ]
})
export class PeopleListModule { }
