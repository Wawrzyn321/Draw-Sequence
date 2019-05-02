<template>
  <article>
    <page-title title="Contribute"></page-title>
    <h2>Contribute to Draw-Sequence</h2>
    <p>
      Here you can add your number to the sequence, either by posting your own
      image with next number of the sequence, or by drawing it on the panel
      below.
    </p>
    <p>Next number to draw: {{ nextToDraw }}.</p>
    <b-tabs content-class="mt-3">
      <b-tab title="Draw" active>
        <draw-component @ocr-success="onOcrSucceeded"></draw-component>
      </b-tab>
      <b-tab title="Upload a picture">
        <upload-component @ocr-success="onOcrSucceeded"></upload-component>
      </b-tab>
    </b-tabs>
  </article>
</template>

<script>
import Draw from "@Partials/Draw";
import Upload from "@Partials/Upload";
import imageApi from "@Api/imageApi";

export default {
  data: function() {
    return {
      count: null
    };
  },
  computed: {
    nextToDraw: function() {
      if (this.count !== null) {
        return this.count + 1;
      } else {
        return "..";
      }
    }
  },
  methods: {
    onOcrSucceeded: function() {
      this.count++;
    }
  },
  async activated() {
    try {
      this.count = await imageApi.getImageCount();
    } catch (err) {
      console.warn(err);
    }
  },
  components: {
    "draw-component": Draw,
    "upload-component": Upload
  }
};
</script>
