import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [MatListModule, CommonModule, RouterModule]
})
export class SharedModule { }
