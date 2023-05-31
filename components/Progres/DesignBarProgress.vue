<template>
  <v-row class="title mt-n3">
    <v-col cols="12">
      <v-progress-linear
        rounded
        :value="defineValue"
        :height="defineSize"
        :origem="origem"
        :percent="defineValue"
        :accesses="accesses"
        :color="defineColor"
      >
        <span class="caption font-weight-medium ml-2"><strong class="font-weight-black">{{percent}}%</strong> | {{origem}}</span>
        <v-spacer></v-spacer>
        <span class="caption font-weight-medium mr-2">{{accesses}}</span>
      </v-progress-linear>
    </v-col>
   
  </v-row>
</template>

<script>
export default {
  props: ["value", "height", "origem", "percent", "accesses"],
  computed: {
    defineValue: function() {
      return this.value || 40;
    },
    defineSize: function() {
      return this.size || 20;
    },
    defineColor: function() {
      return this.color
    },
  },
  name: "BarProgress"
};
</script>
