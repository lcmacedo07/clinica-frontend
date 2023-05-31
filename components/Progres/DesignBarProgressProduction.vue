<template>
  <v-row class="title mt-n3 mb-n3">
    <v-col cols="12">
      <v-progress-linear
        rounded
        :value="defineValue"
        :height="defineSize"
        :origem="origem"
        :accesses="accesses"
        :color="defineColor"
      >
        <span class="caption font-weight-medium ml-2">{{origem}}</span>
        <v-spacer></v-spacer>
        <span class="caption font-weight-medium mr-2">{{accesses}} postagens</span>
      </v-progress-linear>
    </v-col>
   
  </v-row>
</template>

<script>
export default {
  props: ["value", "height", "origem", "percent", "accesses", "color"],
  computed: {
    defineValue: function() {
      return this.value || 100;
    },
    defineSize: function() {
      return this.size || 20;
    },
    defineColor: function() {
      return this.color || "blue-grey lighten-4";
    },
  },
  name: "BarProgressProduction"
};
</script>
