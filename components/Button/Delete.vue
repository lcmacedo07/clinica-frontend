<script setup>
defineProps({
  title: String,
})
defineEmits(['delete'])
</script>

<template>
  <!-- <button
    @click="$emit('delete')"
    class="flex rounded text-white text-xs text-center font-medium px-2.5 py-1.5 leading-normal ml-2 bg-red-500 hover:bg-red-700"
  >
    <div class="i-carbon:trash-can mr-1 mt-0.5" />
    <span v-if="title">{{ title }}</span>
    <span v-else> EXCLUIR </span>
  </button> -->

  <div
    style="display: inline-flex; align-items: center; cursor: pointer;"
    @click="$emit('delete')"
  >
    <div class="i-carbon:trash-can ml-2" @click="$emit('delete')" />
    <span v-if="title">{{ title }}</span>
  </div>
</template>

