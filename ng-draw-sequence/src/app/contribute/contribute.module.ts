import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawComponent } from './draw/draw.component';
import { UploadComponent } from './upload/upload.component';
import { ContributeComponent } from './contribute/contribute.component';
import { RouterModule } from '@angular/router';
import { UploadSummaryComponent } from './upload-summary-component/upload-summary/upload-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrawingCanvasComponent } from './draw/drawing-canvas/drawing-canvas/drawing-canvas.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DrawComponent,
    UploadComponent,
    ContributeComponent,
    UploadSummaryComponent,
    DrawingCanvasComponent
  ],
  exports: [ DrawComponent, UploadComponent ]
})
export class ContributeModule { }
