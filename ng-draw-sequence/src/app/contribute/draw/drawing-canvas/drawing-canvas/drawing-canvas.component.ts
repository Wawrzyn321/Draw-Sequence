import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit {

  @ViewChild('canvas') canvas;

  currentColor = 'black';
  drawColor = 'black';
  eraseColor = 'white';
  isDrawing = false;
  context = null;
  canvasOffset = null;
  penSize = 5;
  minPenSize = 1;
  maxPenSize = 40;

  constructor() { }

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvasOffset = this.getOffset(this.canvas.nativeElement);
    this.resetCanvas();

    window.addEventListener('resize', () => {
      this.canvasOffset = this.getOffset(this.canvas.nativeElement);
    });
  }

  startDrawing() {
    this.checkTools();
    this.isDrawing = true;
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  stroke(e) {
    if (this.hasTouch(e)) {
      e.preventDefault();
    }

    if (!this.isDrawing) {
      return;
    }

    const pos = this.getCursorPos(e);

    this.context.beginPath();
    this.context.arc(pos.x, pos.y, this.penSize, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  }

  resetCanvas() {
    const color = this.context.fillStyle;
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, 300, 200);
    this.context.fillStyle = color;

    this.currentColor = this.drawColor;
  }

  hasTouch(e) {
    return e.touches && e.touches[0];
  }

  getCursorPos(e) {
    if (this.hasTouch(e)) {
      return {
        x: e.touches[0].clientX - this.canvasOffset.left,
        y: e.touches[0].clientY - this.canvasOffset.top
      };
    } else {
      return {
        x: e.clientX - this.canvasOffset.left,
        y: e.clientY - this.canvasOffset.top
      };
    }
  }

  getOffset(elem) {
    let offset = null;
    if (elem) {
      offset = { left: 0, top: 0 };
      do {
        offset.top += elem.offsetTop;
        offset.left += elem.offsetLeft;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  }

  checkTools() {
    this.context.fillStyle = this.currentColor;
    if (this.penSize < this.minPenSize) {
      this.penSize = this.minPenSize;
    }
    else if (this.penSize > this.maxPenSize) {
      this.penSize = this.maxPenSize;
    }
  }
}
