<template>
  <svg :class="['icon', className]">
    <use :href="'/sprite.svg#' + icon" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    className: String,
    icon: {
      type: String,
      validator(value: string) {
        return ['clock', 'arrow-left', 'arrow-right'].indexOf(value) !== -1;
      },
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.icon {
  display: block;
  width: 1em;
  height: 1em;
}
</style>
