import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountingListComponent } from './counting-list/counting-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CountingListComponent],
  exports: [
    CommonModule,
    SharedModule
  ]
})
export class CountingListModule { }
