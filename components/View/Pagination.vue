<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    last: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    model: {
      get() {
        return this.page
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change', page)
    },
  },
}
</script>

<template>
  <v-pagination
    v-model="model"
    :length="total"
    @input="changePage(model)"
  />
</template>

