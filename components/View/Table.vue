<script setup>
const props = defineProps({
  headTH: [String],
  headEdition: [String],
  page: [Number],
  last: [Number],
  total: [Number],
})
const breakpoint = useBreakpoints()
const size = computed(() => breakpoint.value.current)
</script>

<template>
  <!-- <div class="px-4 py-2 rounded-md border border-gray-200">
    <table>
      <thead>
        <tr>
          <th
            v-for="(head, index) in headTH"
            :key="index"
            scope="col"
            class="text-left text-lime-600"
          >
            {{ head }}
          </th>
          <th width="2px" class="text-right" />
        </tr>
      </thead>
      <tbody>
        <slot name="registers" />
      </tbody>
    </table>
  </div> -->

  <div
    class="flex items-center justify-between pt-3"
    :class="size == 'xs' ? 'flex-wrap' : ''"
  >
    <div
      class="flex items-center"
      :class="size == 'xs' ? 'w-full justify-start' : 'justify-between'"
    >
      <p
        class="text-xs sm:text-sm text-gray-700 mt-3"
        :class="size == 'xs' ? 'mb-3' : ''"
      >
        <span class="font-light">
          Pág. {{ page }} de {{ last }} de {{ total }} resultados.
        </span>
      </p>
    </div>

    <div
      class="flex"
      :class="size == 'xs' ? 'w-full justify-start' : 'justify-between'"
    >
      <slot name="paginate" />
    </div>
  </div>
</template>
