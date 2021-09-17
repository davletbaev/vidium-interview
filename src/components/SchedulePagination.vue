<template>
  <div class="schedule__pagination">
    <span
      v-for="episode in items"
      :key="episode.id"
      :class="[
        'schedule__dot',
        episode.id === active && 'schedule__dot--active',
        episode.started && !episode.stopped && 'schedule__dot--live',
        episode.started && episode.stopped && 'schedule__dot--past',
        !episode.started && !episode.stopped && 'schedule__dot--future',
      ]"
      @click="handleDotClick(episode.id)"
    >
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SchedulePagination',
  props: {
    items: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
    },
  },
  methods: {
    handleDotClick(episodeId: number) {
      this.$emit('dot:click', episodeId);
    },
  },
});
</script>

<style lang="scss">
.schedule__pagination {
  width: 88% !important;

  position: absolute;
  top: calc(100% + 7.5px);
  bottom: auto !important;
  left: 50% !important;

  display: flex;

  align-items: center;
  justify-content: center;

  transform: translate(-50%, -50%);
}

.schedule__dot {
  position: relative;

  display: block;

  width: 148px;
  flex: 0 1 148px;
  height: 3px;

  background-color: var(--slider-vod-live-fill);
  border-radius: 7px;

  cursor: pointer;
  opacity: 1;

  transform-origin: center center;

  & + .schedule__dot {
    margin-left: 10px;
  }

  &:before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: calc(100% + 10px);
    height: calc(100% + 10px);

    transform: translate(-5px, -5px);
  }

  &:after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: calc(100% + 2px);
    height: 5px;

    border-radius: 7px;

    background-color: var(--slider-vod-border);

    transform: translate(-1px, -1px);

    pointer-events: none;
  }

  &:hover {
    height: 5px;

    &:after {
      height: 7px;
    }
  }
}

.schedule__dot--past {
  background-color: var(--slider-vod-live-fill);

  &:after {
    background-color: var(--slider-vod-border);
  }
}

.schedule__dot--future {
  background-color: var(--slider-coming-fill);

  &:after {
    background-color: transparent;
  }
}

.schedule__dot--active,
.schedule__dot:active {
  background-color: var(--accent-primary);

  &:after {
    background-color: var(--accent-primary);
  }
}

.schedule__dot--live {
  background-color: var(--slider-hover-fill);

  &:after {
    background: var(--system-live-highlight-gradient);

    background-size: 200%;
    animation: shineBorder linear 2s infinite;
  }

  &.schedule__dot--active:after {
    z-index: 2;
  }
}
</style>
