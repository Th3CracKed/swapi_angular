import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResourcesListComponent } from './resources-list.component';

@NgModule({
    declarations: [
        ResourcesListComponent
    ],
    imports: [SharedModule],
    exports: [
        ResourcesListComponent
    ]
})
export class ResourcesListModule { }
