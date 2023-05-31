<template>
  <div class="flex">
    <label class="switch">
      <!-- @input="$emit('update:modelValue', $event.target.value)" -->
      <input
        type="checkbox"
        :value="modelValue"
        @input="$emit('input', $event)"
        @blur="$emit('blur', $event)"
        @keyup="$emit('keyup', $event)"
      />
      <span class="slider round"></span>
    </label>

    <span class="ml-2 mt-1 bg"> {{ title }} </span>
    <span class="ml-2 mt-1 bg"> {{ modelValue }} </span>
  </div>
</template>


<script>
export default {
  props: ["modelValue", "title"],
  emits: ["update:modelValue"],
};
</script>


<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 25px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}

.slider.round {
  border-radius: 25px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>