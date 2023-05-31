<script setup>
const breakpoint = useBreakpoints()
const size = computed(() => breakpoint.value.current)
</script>

<template>
  <div class="bg-[#eee] min-h-screen">
    <!-- header -->
    <div class="bg-white p-4 shadow flex flex-nowrap justify-between">
      <div class="w-[100px] text-lg font-700 pt-1">
        DDSV
      </div>

      <div class="w-full flex flex-nowrap justify-center items-center">
        <div class="i-carbon:search mr-3" />
        <input
          type="text"
          class="bg-[#eee] rounded p-2 border-0 max-w-[400px] border-[#ccc] w-full"
          placeholder="Search or Paste URL"
        >
        <div class="i-carbon:add ml-3" />
      </div>

      <div class="w-[170px] flex flex-nowrap justify-end items-center">
        <div class="i-carbon:notification mr-3" />
        <img
          src="https://i.insider.com/63fb81d984099d001960d513?width=1136&format=jpeg"
          class="rounded-full w-10 h-10 bg-green mr-2"
        >
        <div class="i-carbon:caret-down" />
      </div>
    </div>

    <main class="container mx-auto py-8 px-4">
      <div>
        <nuxt-page />
      </div>
    </main>
  </div>
</template>
