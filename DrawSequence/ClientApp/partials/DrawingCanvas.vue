<template>
  <div class="row" id="main-container">
    <div class="col-sm-9 mx-auto">
      <canvas
        width="300"
        height="200"
        ref="canvas"
        @mousedown="startDrawing"
        @mouseleave="stopDrawing"
        @mouseup="stopDrawing"
        @mousemove="stroke"
      ></canvas>
    </div>

    <div class="col-sm-3 mx-auto row" id="drawing-tools">
      <b-form-group class="col-sm-12 col-4 mb-0">
        <b-form-radio v-model="currentColor" :value="drawColor">
          Draw
        </b-form-radio>
        <b-form-radio v-model="currentColor" :value="eraseColor">
          Erase
        </b-form-radio>
      </b-form-group>

      <b-form-group
        class="col-sm-12 col-4 px-0"
        label="Pen size"
        label-for="penSizeInput">
        <b-form-input
          id="penSizeInput"
          type="number"
          :min="minPenSize"
          :max="maxPenSize"
          v-model="penSize"
        />
      </b-form-group>

      <b-button
        variant="info"
        class="col-sm-12 col-4"
        id="clearButton"
        @click="resetCanvas"
        >Clear
      </b-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data: function() {
    return {
      currentColor: "black",
      drawColor: "black",
      eraseColor: "white",
      isDrawing: false,
      context: null,
      canvasOffset: null,
      penSize: 5,
      minPenSize: 1,
      maxPenSize: 40
    };
  },
  methods: {
    startDrawing: function() {
      this.isDrawing = true;
    },
    stopDrawing: function() {
      this.isDrawing = false;
    },
    stroke: function(e) {
      if (this.hasTouch(e)) {
        e.preventDefault();
      }

      if (!this.isDrawing) return;

      const pos = this.getCursorPos(e);

      this.context.beginPath();
      this.context.arc(pos.x, pos.y, this.penSize, 0, Math.PI * 2);
      this.context.closePath();
      this.context.fill();
    },
    resetCanvas: function() {
      const color = this.context.fillStyle;
      this.context.fillStyle = "white";
      this.context.fillRect(0, 0, 300, 200);
      this.context.fillStyle = color;

      this.currentColor = this.drawColor;
    },
    hasTouch(e) {
      return e.touches && e.touches[0];
    },
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
    },
    getOffset: function(elem) {
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
  },
  async mounted() {
    this.context = this.$refs.canvas.getContext("2d");
    // we need to wait, as page must finish resizing
    await Vue.nextTick();

    this.canvasOffset = this.getOffset(this.$refs.canvas);
    this.resetCanvas();

    window.addEventListener("resize", () => {
      this.canvasOffset = this.getOffset(this.$refs.canvas);
    });
  },
  watch: {
    currentColor: function(newValue) {
      this.context.fillStyle = newValue;
    },
    penSize: function(newValue) {
      if (newValue > this.maxPenSize) {
        this.penSize = this.maxPenSize;
      } else if (newValue < this.minPenSize) {
        this.penSize = this.minPenSize;
      }
    }
  }
};
</script>

<style scoped>
canvas {
  margin: 0 auto;
  display: block;
  border: 1px solid black;
  margin-bottom: 20px;
}

#penSizeInput {
  max-width: 80px;
}

#main-container {
  max-width: 450px;
  margin: 0 auto;
}

#clearButton {
  max-height: 2.5em;
}

@media only screen and (max-width: 576px) {
  #drawing-tools {
    min-width: 350px;
  }
}
</style>
