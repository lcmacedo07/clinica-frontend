<template>
  <div class="mb-5 md:mb-7">
    <div class="flex">
      <div class="relative w-full" data-te-input-wrapper-init>
        <!-- <div
          v-if="msgvalidate.$error"
          class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-red-600"
        >
          <i class="i-carbon:warning-filled text-lg" aria-hidden="true"></i>
        </div> -->

        <button class="btn mr-1" @click="applyBold()">Bold</button>
        

        <textarea
          :id="label"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          @blur="$emit('blur', $event)"
          @keyup="$emit('keyup', $event)"
          :errordata="errordata"
          :minlength="defineMinLength"
          :maxlength="defineMaxLength"
          class="peer block min-h-[auto] w-full rounded border text-sm md:text-base bg-white py-[0.32rem] px-3 pr-8 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:shadow-md"
          :class="
            msgvalidate.$error
              ? 'border-red shadow-red-100'
              : 'border-lime-600  shadow-lime-100'
          "
        ></textarea>

        {{ modelValue }}

        <!-- <label
          :for="label"
          class="absolute px-1 top-0 left-3 max-w-[90%] pt-[0.37rem] text-xs bg-white -translate-y-[0.9rem]"
          :class="msgvalidate.$error ? 'text-red' : 'text-lime-600'"
          >{{ label }}
        </label> -->
      </div>
    </div>

    <p v-if="msgvalidate.$errors.length > 0" class="text-xs text-red-500 mt-1">
      <span v-if="msgvalidate.$errors[0].$validator == 'required'">
        Obrigatório.
      </span>
      <span v-else-if="msgvalidate.$errors[0].$validator == 'minLength'">
        Mín {{ msgvalidate.$errors[0].$params.min }} caracteres
      </span>
      <span v-else-if="msgvalidate.$errors[0].$validator == 'maxLength'">
        Mín {{ msgvalidate.$errors[0].$params.max }} caracteres
      </span>
    </p>

    <p class="text-xs text-red-500 mt-1" v-else-if="errordata">
      <span v-if="errordata">{{ errordata[0] }} </span>
    </p>
  </div>
</template>


<script setup>
const editor = document.getElementById("editor");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");

// boldButton.addEventListener("click", () => {
//   document.execCommand("bold");
// });

// italicButton.addEventListener("click", () => {
//   document.execCommand("italic");
// });

// underlineButton.addEventListener("click", () => {
//   document.execCommand("underline");
// });
</script>

<script>
export default {
  props: [
    "modelValue",
    "label",
    "msgvalidate",
    "errordata",
    "minlength",
    "maxlength",
  ],
  emits: ["update:modelValue"],

  data: function () {
    return {};
  },

  methods: {
    applyBold() {
      const textarea = document.getElementById(this.label);
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      selectedText.style.fontWeight = "bold";
      // const boldText = `<b>${selectedText}</b>`;
      // const newText =
      //   textarea.value.substring(0, start) +
      //   boldText +
      //   textarea.value.substring(end);
      // textarea.value = newText;
    },
  },

  computed: {
    defineRequired: function () {
      return this.required || false;
    },
    defineMinLength: function () {
      return this.minLength || null;
    },
    defineMaxLength: function () {
      return this.maxLength || null;
    },
  },
};
</script>