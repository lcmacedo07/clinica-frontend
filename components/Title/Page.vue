<script setup>
const props = defineProps({
  title: [String],
  description: [String],
})
defineEmits(['clickSubmit'])
const breakpoint = useBreakpoints()
const size = computed(() => breakpoint.value.current)
</script>

<template>
  <div
    class="flex md:justify-between mb-6"
    :class="size == 'xs' ? 'flex-wrap ' : 'flex-nowrap'"
  >
    <div
      class="w-full text-gray-500 font-light"
      :class="size == 'xs' ? 'mb-2' : ''"
    >
      <p class="text-[15pt] mt-1">
        {{ title }}
      </p>
      <p class="text-sm -mt-1">
        {{ description }}
      </p>
      <!-- <p class="text-sm -mt-1">Somente um teste para ver o layout</p> -->
    </div>

    <div class="flex nowrap md:ml-4 md:max-w-xl w-full items-end">
      <input
        id="searchField"
        required
        minlength="5"
        class="text-sm placeholder:text-xs border border-lime-500 p-1.5 rounded mr-1 flex w-full"
        placeholder="Palavra(s) chave(s)"
      >
      <button
        class="flex rounded text-xs font-medium px-3 bg-lime-300 hover:bg-lime-500 hover:text-white focus:bg-lime-500 focus:text-white h-9 items-center"
        @click="$emit('clickSubmit')"
      >
        PESQUISAR
        <div class="i-carbon:search text-lg ml-2" />
      </button>
    </div>
  </div>
</template>
