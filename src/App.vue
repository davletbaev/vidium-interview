<template>
  <div class="">
    <Schedule />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Schedule from './components/Schedule.vue';

export default defineComponent({
  name: 'App',
  components: {
    Schedule,
  },
});
</script>

<style lang="scss">
</style>
