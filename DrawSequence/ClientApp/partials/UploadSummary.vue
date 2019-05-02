<template>
  <div v-if="result" class="mb-2 text-center">
    <ul>
      <li v-for="(message, index) in result.errors" :key="index">
        {{ message }}
      </li>
    </ul>
    <p class="alert" :class="recognizedTextClass">
      {{ recognizedTextMessage }}
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    isRecognizedTextEmpty: function() {
      return !this.result.recognizedText || this.result.recognizedText === "";
    },
    recognizedTextMessage: function() {
      if (this.isRecognizedTextEmpty) {
        return "No text has been recognized.";
      } else {
        return `Recognized text: "${this.result.recognizedText}"`;
      }
    },
    recognizedTextClass: function() {
      if (!this.result) {
        return "";
      } else {
        if (this.result.succeeded) {
          return "alert-success";
        } else {
          if (this.isRecognizedTextEmpty) {
            return "alert-warning";
          } else {
            return "alert-danger";
          }
        }
      }
    }
  },
  props: {
    result: {
      required: false,
      default: null
    }
  }
};
</script>

<style scoped>
p {
  max-width: 60%;
  margin: 0 auto;
}
</style>
