<template>
  <div>
    <drawing-canvas></drawing-canvas>
    <div>
      <upload-summary :result="lastResult"></upload-summary>
      <b-button
        class="mt-3"
        type="submit"
        variant="info"
        @click="onSubmit($event)"
      >
        <b-spinner v-if="isSubmitting" small type="grow" />
        {{ submitButtonText }}
      </b-button>
    </div>
  </div>
</template>

<script>
import UploadSummary from "@Partials/UploadSummary";
import DrawingCanvas from "@Partials/DrawingCanvas";
import imageApi from "@Api/imageApi";

export default {
  data: function() {
    return {
      lastResult: null,
      isSubmitting: false
    };
  },
  computed: {
    submitButtonText: function() {
      return this.isSubmitting ? "Submitting..." : "Submit";
    }
  },
  methods: {
    async upload(file) {
      const dataModel = new FormData();
      dataModel.append("file", file);

      try {
        this.isSubmitting = true;
        const result = await imageApi.uploadImage(dataModel);
        this.lastResult = result;
        if (result.succeeded) {
          this.$emit("ocr-success", result);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        this.isSubmitting = false;
      }
    },
    async onSubmit(e) {
      e.preventDefault();
      const file = this.createFileToUpload();
      await this.upload(file);
    },
    createFileToUpload() {
      const dataURI = document.querySelector("canvas").toDataURL();
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const arr = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        arr[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: mimeString });
    }
  },
  components: {
    "upload-summary": UploadSummary,
    "drawing-canvas": DrawingCanvas
  }
};
</script>

<style scoped>
button[type="submit"] {
  margin: 0 auto;
  display: block;
}
</style>
