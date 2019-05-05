import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from '../image-card/image-card.component';
import { LoaderDirective } from '../loader-directive/loader.directive';
import { PreventDefaultDirective } from '../prevent-default.directive/prevent-default.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderDirective,
    PreventDefaultDirective,
    ImageCardComponent
  ],
  exports: [
    LoaderDirective,
    PreventDefaultDirective,
    ImageCardComponent
  ]
})
export class SharedModule { }
