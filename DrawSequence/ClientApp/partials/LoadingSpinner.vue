<template>
  <b-spinner
    :class="{ 'd-none': !isLoading }"
    class="spinner"
    type="grow"
    label="Loading..."
  />
</template>

<script>
export default {
  props: {
    isLoading: {
      required: true,
      type: Boolean
    }
  }
};
</script>

<style scoped>
.spinner {
  width: 3rem;
  height: 3rem;
}
</style>
