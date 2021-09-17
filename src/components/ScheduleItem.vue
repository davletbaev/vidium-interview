<template>
  <div class="schedule-item">
    <div
      :class="[
        'schedule-item__wrapper',
        active && 'schedule-item__wrapper--active',
        live && 'schedule-item__wrapper--live',
      ]"
      @click="handleClick"
    >
      <div class="schedule-item__time">
        <Icon
          className="schedule-item__time-icon"
          icon="clock"
        />
        {{ formattedStartTime }}
      </div>
      <div
        v-if="live"
        class="schedule-item__live"
      >Эфир</div>

      <div class="schedule-item__content">
        <div :class="['schedule-item__title', !formattedSpeakers.length && 'schedule-item__title--long']">
          {{ title }}
        </div>
        <div
          v-if="formattedSpeakers.length"
          class="schedule-item__speakers"
        >{{ formattedSpeakers }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

import Icon from '@/components/Icon.vue';
import { ISpeaker } from '@/api/types';

export default defineComponent({
  name: 'ScheduleItem',
  props: {
    id: Number,
    plannedTime: String,
    title: String,
    started: Boolean,
    stopped: Boolean,
    speakers: Array,
    active: Boolean,
  },
  computed: {
    live() {
      return this.started && !this.stopped;
    },
    formattedStartTime() {
      return moment(this.plannedTime).format('HH:mm');
    },
    formattedSpeakers() {
      return this.speakers
        ? this.speakers
          .map((speaker) => {
            const [firstName, lastName] = (speaker as ISpeaker).name.split(' ');

            const shortFirstName = firstName.charAt(0).toUpperCase();
            const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

            return `${shortFirstName}.\u00A0${capitalizedLastName}`;
          })
          .join(', ')
        : '';
    },
  },
  methods: {
    handleClick() {
      this.$emit('selected', this.id);
    },
  },
  components: {
    Icon,
  },
});
</script>

<style lang="scss">
.schedule-item {
  width: 100%;
  height: 86px;

  position: relative;
}

.schedule-item__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  height: auto;
  min-height: 100%;
  max-height: 86px;
  padding: 4px 10px 10px;

  display: grid;
  grid-gap: 7px 10px;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;

  background: var(--slider-vod-live-fill);

  font-size: var(--fs-text-small);
  font-weight: 500;

  color: var(--text-light-third);

  border-radius: 10px;

  cursor: pointer;

  &:after {
    content: '';

    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;

    width: calc(100% + 2px);
    height: calc(100% + 2px);

    border-radius: 12px;

    background-color: var(--slider-vod-border);

    transform: translate(-50%, -50%);
  }
}

.schedule-item__wrapper:hover {
  color: var(--text-light-secondary);
  background: var(--slider-hover-fill);

  .schedule-item__title {
    color: var(--text-light-primary);
  }
}

.schedule-item__wrapper--active,
.schedule-item__wrapper:active,
.schedule-item__wrapper--live {
  color: var(--text-light-secondary);
  background: var(--slider-hover-fill);

  .schedule-item__title {
    color: var(--text-light-primary);
    font-weight: 600;
  }

  &:after {
    width: calc(100% + 4px);
    height: calc(100% + 4px);
  }

  &:hover {
    max-height: 300px;
    box-shadow: var(--hard-drop-shadow);

    .schedule-item__title,
    .schedule-item__speakers {
      display: block;
    }
  }
}

.schedule-item__wrapper--active,
.schedule-item__wrapper:active {
  &:after {
    background-color: var(--accent-primary);
  }
}

.schedule-item__wrapper--live {
  &:after {
    // Использовал кастомный градиент.
    // Сделал стандартный в 2 раза больше и сделал его симметричным, чтобы не было жестких переходов при анимации
    background: linear-gradient(90deg, #456EFF 0%, #F04D4D 50%, #476FFF 100%);

    background-size: 200%;
    animation: shineBorder linear 2s infinite;
  }
}

.schedule-item__time {
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  margin-top: 3px;

  display: grid;
  grid-gap: 2px;
  align-items: center;
  grid-auto-flow: column;

  font-size: var(--fs-text);
  line-height: 18px;
  letter-spacing: -0.07em;
}

.schedule-item__time-icon {
  font-size: 12px;
}

.schedule-item__live {
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  display: flex;
  align-items: center;

  line-height: 17px;

  &:before {
    content: '';

    display: block;
    width: 4px;
    height: 4px;

    margin-right: 3px;

    background: var(--system-live);

    border-radius: 50%;
  }
}

.schedule-item__content {
  grid-column: 2 / 3;
  grid-row: span 3;

  display: flex;
  flex-direction: column;
}

.schedule-item__title {
  flex: 0 0 auto;

  font-size: var(--fs-text);
  font-weight: 500;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.schedule-item__title--long {
  -webkit-line-clamp: 3;
}

.schedule-item__speakers {
  flex: 0 0 auto;

  margin-top: 5px;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes shineBorder {
  0% {
    background-position: 0;
  }

  100% {
    background-position: 200%;
  }
}
</style>
