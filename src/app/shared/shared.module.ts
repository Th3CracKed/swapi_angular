import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExtractIdFromUrlPipe } from '../pipes';
import { VarDirective } from '../directives';

@NgModule({
    declarations: [ExtractIdFromUrlPipe, VarDirective],
    exports: [MatListModule,
        CommonModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ExtractIdFromUrlPipe,
        VarDirective
    ]
})
export class SharedModule { }
