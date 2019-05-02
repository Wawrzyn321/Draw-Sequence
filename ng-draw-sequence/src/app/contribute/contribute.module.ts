import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawComponent } from './draw/draw.component';
import { UploadComponent } from './upload/upload.component';
import { ContributeComponent } from './contribute/contribute.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [DrawComponent, UploadComponent, ContributeComponent],
  exports: [DrawComponent, UploadComponent]
})
export class ContributeModule { }
