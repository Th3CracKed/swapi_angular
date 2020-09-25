import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FilmsListComponent } from './films-list.component';

@NgModule({
    declarations: [
        FilmsListComponent
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    exports: [
        FilmsListComponent
    ]
})
export class FilmsListModule { }
