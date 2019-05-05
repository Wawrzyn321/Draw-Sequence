import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from '../image-card/image-card.component';
import { LoaderDirective } from '../loader-directive/loader.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImageCardComponent,
    LoaderDirective
  ],
  exports: [
    ImageCardComponent,
    LoaderDirective
  ]
})
export class SharedModule { }
