<script setup>
defineProps({
  title: String,
})
defineEmits(['edit'])
</script>

<template>
  <!-- <button
    @click="$emit('edit')"
    class="flex rounded text-white text-xs text-center font-medium px-2.5 py-1.5 leading-normal ml-2 bg-lime-500 hover:bg-lime-700"
  >
    <div class="i-carbon:pen mr-1 mt-0.5" />
    <span v-if="title">{{ title }}</span>
    <span v-else> EDITAR </span>
  </button> -->

  <div
    style="display: inline-flex; align-items: center; cursor: pointer;"
    @click="$emit('edit')"
  >
    <div class="i-carbon:edit ml-2" @click="$emit('edit')" />
    <span v-if="title">{{ title }}</span>
  </div>
</template>

