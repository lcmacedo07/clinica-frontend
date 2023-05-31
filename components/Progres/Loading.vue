<template>
  <div class="loading">
      <v-progress-circular
        fill-height
        class="progress"
        :size="150"
        :width="3"
        color="purple"
        indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
