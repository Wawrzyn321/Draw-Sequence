import React from "react";

class DrawingCanvas extends React.Component {
  drawColor = "black";
  eraseColor = "white";
  minPenSize = 1;
  maxPenSize = 40;

  constructor(props) {
    super(props);
    this.state = {
      currentColor: this.drawColor,
      isDrawing: false,
      canvasOffset: null,
      penSize: 5
    };

    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.stroke = this.stroke.bind(this);
    this.setPenSize = this.setPenSize.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
  }

  componentDidMount() {
    this.setState({ canvasOffset: this.getOffset(this.props.canvasRef.current) }, () => {
      this.resetCanvas();
    });

    window.addEventListener("resize", () => {
      this.setState({ canvasOffset: this.getOffset(this.props.canvasRef.current) });
    });
  }

  setPenSize(e) {
    const penSize = Math.max(Math.min(e.target.value, this.maxPenSize), this.minPenSize);
    this.setState({ penSize })
  }

  startDrawing() {
    this.setState({ isDrawing: true });
  }

  stopDrawing() {
    this.setState({ isDrawing: false });
  }

  stroke(e) {
    if (this.hasTouch(e)) {
      e.preventDefault();
    }
    if (!this.state.isDrawing) return;

    const pos = this.getCursorPos(e);
    const context = this.getCanvasContext();

    context.fillStyle = this.state.currentColor;
    context.beginPath();
    context.arc(pos.x, pos.y, this.state.penSize, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  resetCanvas() {
    const context = this.getCanvasContext();
    const color = context.fillStyle;

    context.fillStyle = "white";
    context.fillRect(0, 0, 300, 200);
    context.fillStyle = color;

    this.setState({ currentColor: this.drawColor });
  }

  hasTouch(e) {
    return e.touches && e.touches[0];
  }

  getCursorPos(e) {
    if (this.hasTouch(e)) {
      return {
        x: e.touches[0].clientX - this.state.canvasOffset.left,
        y: e.touches[0].clientY - this.state.canvasOffset.top
      };
    } else {
      return {
        x: e.clientX - this.state.canvasOffset.left,
        y: e.clientY - this.state.canvasOffset.top
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

  getCanvasContext() {
    return this.props.canvasRef.current.getContext("2d");
  }

  render() {
    return (
      <section className="row" id="main-container">
        <div className="col-sm-9 mx-auto">
          <canvas
            ref={this.props.canvasRef}
            width="300"
            height="200"
            onMouseDown={this.startDrawing}
            onMouseLeave={this.stopDrawing}
            onMouseUp={this.stopDrawing}
            onMouseMove={this.stroke}
          />
        </div>

        <div className="col-sm-3 mx-auto row" id="drawing-tools">
          <div className="col-sm-12 col-4 mb-0">
            <div className="custom-control custom-radio">
              <input
                className="custom-control-input"
                type="radio"
                id="drawColor"
                name="currentColor"
                value={this.drawColor}
                checked={this.state.currentColor === this.drawColor}
                onChange={e => this.setState({ currentColor: e.target.value })}
              />
              <label className="custom-control-label" htmlFor="drawColor">
                Draw
              </label>
            </div>
            <div className="custom-control custom-radio">
              <input
                className="custom-control-input"
                type="radio"
                id="eraseColor"
                name="currentColor"
                value={this.eraseColor}
                checked={this.state.currentColor === this.eraseColor}
                onChange={e => this.setState({ currentColor: e.target.value })}
              />
              <label className="custom-control-label" htmlFor="eraseColor">
                Erase
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-12 col-4 px-0" htmlFor="penSizeInput">
              Pen size
            </label>
            <input
              className="form-control"
              id="penSizeInput"
              type="number"
              min={this.minPenSize}
              max={this.maxPenSize}
              value={this.state.penSize}
              onChange={this.setPenSize}
            />
          </div>

          <button
            variant="info" 
            className="btn btn-info col-sm-12 col-4"
            onClick={this.resetCanvas}
            id="clear-button">
            Clear
          </button>
        </div>
      </section>
    );
  }
}

export default React.forwardRef((props, ref) => <DrawingCanvas canvasRef={ref} {...props}/>);
