<template>
  <main class="app">
    <div class="container mx-auto app__schedule">
      <Schedule :eventId="'20210619-scheduletest'" />
    </div>
  </main>
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
.app {
  height: 100%;
}

.app__schedule {
  height: 100%;

  display: flex;
  align-items: center;

  overflow-x: hidden;
}
</style>
