<template>
  <div class="flex">
    <div class="relative w-full" data-te-input-wrapper-init>
      <div
        v-if="msgvalidate.$error"
        class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-red-600"
      >
        <i class="i-carbon:warning-filled text-lg" aria-hidden="true"></i>
      </div>

      <textarea 
        :id="defineId"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @keyup="$emit('keyup', $event)"
        :disabled="defineDisabled"
        :errordata="errordata"
        :minlength="defineMinLength"
        :maxlength="defineMaxLength"
        :rows="defineRows"
        class="peer block min-h-[auto] w-full rounded border text-sm md:text-base bg-white py-[0.45rem] px-3 pr-8 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:shadow-md"
        :class="
          msgvalidate.$error
            ? 'border-red shadow-red-100'
            : 'border-lime-600  shadow-lime-100'
        "
      >
    </textarea>
      

      <label
        :for="label"
        class="absolute px-1 top-0 left-3 max-w-[90%] pt-[0.37rem] text-xs bg-white -translate-y-[0.9rem]"
        :class="msgvalidate.$error ? 'text-red' : 'text-lime-600'"
        >{{ label }}
      </label>
    </div>
  </div>

  <p v-if="msgvalidate.$errors.length > 0" class="text-xs text-red-500 mt-1">
    <span v-if="msgvalidate.$errors[0].$validator == 'required'">
      Obrigatório.
    </span>
    <span v-else-if="msgvalidate.$errors[0].$validator == 'minLength'"
      >Mín {{ msgvalidate.$errors[0].$params.min }}
      <span v-if="defineType != 'number'">caracteres</span>
    </span>

    <span
      v-else-if="
        msgvalidate.$error && msgvalidate.$errors[0].$validator == 'maxLength'
      "
      >Máx {{ msgvalidate.$errors[0].$params.max }}
      <span v-if="defineType != 'number'">caracteres</span>
    </span>
  </p>

  <p class="text-xs text-red-500 mt-1" v-else-if="errordata">
    <span v-if="errordata">{{ errordata[0] }} </span>
  </p>
</template>

<script>
export default {
  props: [
    "id",
    "modelValue",
    "label",
    "msgvalidate",
    "errordata",
    "minlength",
    "maxlength",
    "rows",
  ],
  emits: ["update:modelValue"],

  computed: {
    defineId: function () {
      return this.id || `ref_${this.label}`;
    },
    defineRows: function () {
      return this.rows || 2;
    },
    defineRequired: function () {
      return this.required || false;
    },
    defineDisabled: function () {
      return this.disabled || false;
    },
    defineMinLength: function () {
      return this.minlength || null;
    },
    defineMaxLength: function () {
      return this.maxlength || null;
    },
  },
};
</script>