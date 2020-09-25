import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { StarshipsListComponent } from './starships-list.component';

@NgModule({
    declarations: [
        StarshipsListComponent
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    exports: [
        StarshipsListComponent
    ]
})
export class StarshipsListModule { }
