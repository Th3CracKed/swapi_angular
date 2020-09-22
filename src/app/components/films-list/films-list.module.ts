import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FilmsListComponent } from './films-list.component';

@NgModule({
    declarations: [
        FilmsListComponent
    ],
    imports: [SharedModule],
    exports: [
        FilmsListComponent
    ]
})
export class FilmsListModule { }
