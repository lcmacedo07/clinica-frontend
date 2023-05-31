<template>
  <button
    class="mb-2 flex rounded text-xs font-medium px-3 bg-lime-300 hover:bg-lime-500 hover:text-white focus:bg-lime-500 focus:text-white h-9 items-center"
    @click="$emit('add')"
  >
    NOVO REGISTRO
    <div class="i-carbon:add-alt text-lg ml-2" />
  </button>
</template>