import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FilmDetailComponent } from './film-detail.component';

@NgModule({
    declarations: [
        FilmDetailComponent
    ],
    imports: [SharedModule],
    exports: [
        FilmDetailComponent
    ]
})
export class FilmsDetailModule { }
