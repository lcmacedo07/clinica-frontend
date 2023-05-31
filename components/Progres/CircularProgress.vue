<template>
  <div>
    <v-progress-circular
      :size="defineSize"
      :value="defineValue"
      :width="defineWidth"
      :legendTop="defineLegendTop"
      :legend="defineLegend"
    >{{defineValue}}%</v-progress-circular>
    <p class="title mt-2">{{legendTop}}</p>
    <p class="caption font-weight-medium mt-n5">{{legend}}</p>
  </div>
</template>

<script>
export default {
  props: ["size", "width", "value", "legendTop", "legend"],
  computed: {
    defineSize: function() {
      return this.size || 90;
    },
    defineValue: function() {
      return this.value || 40;
    },
    defineWidth: function() {
      return this.width || 9;
    },
    defineLegendTop: function() {
      return this.legendTop || "1000";
    },
    defineLegend: function() {
      return this.legend || "1000";
    },
  },
  name: "CircularProgress"
};
</script>
