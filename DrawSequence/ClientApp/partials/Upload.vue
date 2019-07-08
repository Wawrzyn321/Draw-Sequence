<template>
  <div class="main-container">
    <form method="POST" enctype="multipart/form-data" class="mb-2"> <!-- todo check enctype -->
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        accept="image/*"
        @change="fileInputChanged"
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
      />
    </form>
    <upload-summary :result="lastResult"></upload-summary>
    <section class="my-3" v-if="lastResult && !lastResult.succeeded">
      <h5>Advanced options</h5>
      <input type="checkbox" v-model="useWhiteList" />
      <label for="checkbox">Recognize only numbers</label>
      <br />
      <input type="checkbox" v-model="recognizeOnlyTarget" />
      <label for="checkbox">Try to recognize only target number</label>
    </section>
    <b-button
      type="submit"
      variant="info"
      @click="onSubmit($event)"
      :disabled="!file"
    >
      <b-spinner v-if="isSubmitting" small type="grow" />
      {{ submitButtonText }}
    </b-button>
  </div>
</template>

<script>
import UploadSummary from "@Partials/UploadSummary";
import imageApi from "@Api/imageApi";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_B = MAX_FILE_SIZE_MB * 1024 * 1024;

export default {
  data: function() {
    return {
      file: null,
      useWhiteList: false,
      recognizeOnlyTarget: false,
      lastResult: null,
      isSubmitting: false
    };
  },
  methods: {
    fileInputChanged() {
      this.lastResult = null;
      this.resetOptions();
    },
    async upload(file) {
      const dataModel = new FormData();
      dataModel.append("file", file);
      const params = {
        recognizeOnlyTarget: this.recognizeOnlyTarget,
        whitelistDigits: this.useWhiteList
      };

      try {
        this.isSubmitting = true;
        const result = await imageApi.uploadImage(dataModel, params);
        this.lastResult = result;
        if (result.succeeded) {
          this.resetOptions();
          this.$emit("ocr-success", result);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        this.isSubmitting = false;
      }
    },
    resetOptions() {
      this.useWhiteList = false;
      this.recognizeOnlyTarget = false;
    },
    async onSubmit(e) {
      e.preventDefault();
      if (this.file.size > MAX_FILE_SIZE_B) {
        alert(`File size exceeded! Max file size: ${MAX_FILE_SIZE_MB} MB.`);
        this.file = null;
      } else {
        await this.upload(this.file);
      }
    }
  },
  computed: {
    submitButtonText: function() {
      if (this.isSubmitting) {
        return "Submitting...";
      } else {
        if (this.lastResult && !this.lastResult.succeeded) {
          return "Try again";
        } else {
          return "Submit";
        }
      }
    }
  },
  components: {
    "upload-summary": UploadSummary
  }
};
</script>

<style scoped>
.main-container {
  margin: 0 auto;
  max-width: 300px;
}

input[type="file"] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

button[type="submit"] {
  margin: 0 auto;
  display: block;
}
</style>
