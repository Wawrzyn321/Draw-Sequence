import { Component } from '@angular/core';
import { PointContainerService } from 'src/app/point-container/point-container.service';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent {

  constructor(private pointContainerService: PointContainerService) { }

  get nextToDraw() {
    const count = this.pointContainerService.count;
    if (count !== null) {
      return count + 1;
    } else {
      return '..';
    }
  }

  updateImageCount() {
    this.pointContainerService.updateImageCount();
  }
}
