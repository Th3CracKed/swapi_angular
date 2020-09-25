import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StarshipsDetailComponent } from './starships-detail.component';

@NgModule({
    declarations: [
        StarshipsDetailComponent
    ],
    imports: [SharedModule],
    exports: [
        StarshipsDetailComponent
    ]
})
export class StarshipsDetailModule { }
