<template>
  <div></div>
</template>

<script>
export default {
  name: "page-title",
  watch: {
    title() {
      document.title = this.title;
    }
  },
  mounted() {
    document.title = this.title;
  },
  props: {
    title: {
      required: true,
      type: String
    }
  }
};
</script>
