<script setup>
const breakpoint = useBreakpoints();
const size = computed(() => breakpoint.value.current);

defineProps({
  title: String,
  error: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
});
</script>

<template>
  <v-card>
    <div class="bg-lime flex flex--nowrap">
      <div class="w-full text-white p-2 pl-6 text-xl">
        {{ title }}
      </div>
      <div class="w-10 pt-2">
        <div
          @click="$emit('close')"
          class="i-carbon:close-filled bg-red-600 hover:bg-red-800 text-[17pt] cursor-pointer"
        ></div>
      </div>
    </div>

    <v-card-text>

      <div class="pt-3 pb-5">

        <v-form @submit.prevent="save" enctype="multipart/form-data">
          <slot name="formulary"></slot>
        </v-form>
  
        <div
          class="mt-5 pt-5 border-t border-gray-200 w-full flex flex-wrap justify-between"
        >
          <table class="p-0">
            <tr v-if="size=='xs'" class="border-0">
              <td colspan="5" class="p-0 pb-2">
                <p v-if="error" class="text-gray-400 text-xs leading-3">
                  Preencha os campos obrigatórios(*) e sem erros para ativar o
                  botão.
                </p>
              </td>
            </tr>
            <tr class="p-0 border-0">
              <td width="100px" class="p-0">
                <button
                  @click="$emit('close')"
                  class="inline-block px-4 py-1.5 font-medium text-white bg-gray-400 hover:bg-gray-600 focus:bg-gray-600 text-xs rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  FECHAR
                </button>
              </td>
              <td class="p-0 flex justify-end pr-2" v-if="size != 'xs'">
                <div class="w-60 text-right">
                  <p v-if="error" class="text-gray-400 text-xs leading-3">
                    Preencha os campos obrigatórios(*) e sem erros para ativar o
                    botão.
                  </p>
                </div>
              </td>
              <td width="100px" class="p-0 text-right">
                <button
                  :disabled="error || loading"
                  @click="$emit('save')"
                  class="flex flex-nowrap px-4 py-1 w-full text-lime-900 text-xs font-medium rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  :class="
                    !error && !loading
                      ? 'bg-lime-300 hover:hover:bg-lime-500 focus:hover:bg-lime-500'
                      : 'bg-gray-300'
                  "
                >
                  <div class="pt-0.5 pb-0.5 w-full">SALVAR</div>
                  <div class="ml-2" v-if="loading">
                    <v-progress-circular
                      size="20"
                      indeterminate
                      color="white"
                    />
                  </div>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>





    </v-card-text>
  </v-card>
</template>