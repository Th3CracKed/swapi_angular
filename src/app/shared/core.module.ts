import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APP_ENV } from './app.config';


@NgModule({
    providers: [
        {
            provide: APP_ENV,
            useValue: environment
        }
    ]
})
export class CoreModule { }
