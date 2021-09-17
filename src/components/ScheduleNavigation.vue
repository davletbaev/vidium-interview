<template>
  <div class="schedule__navigation">
    <button
      ref="buttonPrev"
      class="schedule__button schedule__button--prev"
      @click="handleButtonClick"
    >
      <Icon icon="arrow-left" />
    </button>
    <button
      ref="buttonNext"
      class="schedule__button schedule__button--next"
      @click="handleButtonClick"
    >
      <Icon icon="arrow-right" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'ScheduleNavigation',
  methods: {
    handleButtonClick() {
      this.$emit('click');
    },
  },
  components: {
    Icon,
  },
});
</script>

<style lang="scss">
.schedule__navigation {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;

  display: flex;
  justify-content: space-between;

  width: 88%;

  transform: translate(-50%, -50%);

  pointer-events: none;
}

.schedule__button {
  width: 37px;
  height: 37px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 27px;

  color: var(--buttons-bubbles-default-fill-icon-borders-default);
  background-color: var(--background-light);

  border: 1px solid var(--buttons-bubbles-default-fill-icon-borders-default);
  border-radius: 10px;

  pointer-events: all;
  cursor: pointer;

  &--prev {
    margin-right: auto;
  }

  &--next {
    margin-left: auto;
  }

  &:hover,
  &:focus-visible {
    color: var(--buttons-bubbles-default-fill-icon-borders-active);
    border-color: var(--buttons-bubbles-default-fill-icon-borders-active);
  }

  &:active {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }
}

.schedule__button--disabled {
  display: none;
}
</style>
