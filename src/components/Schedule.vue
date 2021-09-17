<template>
  <div
    class="schedule"
    @mouseenter="showNavigation"
    @mousemove="showPagination"
    @mouseleave="hideNavigation"
  >
    <swiper
      class="schedule__swiper"
      :navigation="navigation"
      :mousewheel="mousewheel"
      :centeredSlides="true"
      :centeredSlidesBounds="true"
      :pagination="pagination"
      :threshold="20"
      :slides-per-view="'auto'"
      :space-between="10"
      @swiper="setSwiper"
    >
      <swiper-slide
        v-for="episode in episodes"
        :key="episode.id"
        class="schedule__item"
      >
        <ScheduleItem
          :id="episode.id"
          :plannedTime="episode.plannedTime"
          :title="episode.title"
          :started="episode.started"
          :stopped="episode.stopped"
          :speakers="episode.speakers"
          :active="episode.id === active"
          @selected="handleSelect"
        />
      </swiper-slide>
    </swiper>

    <div
      v-show="navigationShown"
      class="schedule__navigation"
    >
      <button
        ref="buttonPrev"
        class="schedule__button schedule__button--prev"
        @click="showPagination"
      >
        <Icon icon="arrow-left" />
      </button>
      <button
        ref="buttonNext"
        class="schedule__button schedule__button--next"
        @click="showPagination"
      >
        <Icon icon="arrow-right" />
      </button>
    </div>

    <div
      v-show="paginationShown"
      class="schedule__pagination"
    >
      <span
        v-for="episode in episodes"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import SwiperCore, { Navigation, Mousewheel, Swiper as ISwiper } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import ScheduleItem from '@/components/ScheduleItem.vue';
import Icon from '@/components/Icon.vue';
import { IModifiedEpisode } from '@/api/types';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Navigation, Mousewheel]);

interface IScheduleData {
  active: number | null;
  swiperRef: ISwiper | null;
  navigationShown: boolean;
  paginationShown: boolean;
  paginationHideTimeout: number;
  mousewheel: {
    forceToAxis: boolean;
    releaseOnAges: boolean;
  };
}

export default defineComponent({
  name: 'Schedule',
  props: {
    eventId: String,
  },
  data(): IScheduleData {
    return {
      active: null,
      navigationShown: false,
      paginationShown: false,
      paginationHideTimeout: 0,
      swiperRef: null,
      mousewheel: {
        forceToAxis: true,
        releaseOnAges: true,
      },
    };
  },
  computed: {
    navigation() {
      return {
        disabledClass: 'schedule__button--disabled',
        lockClass: 'schedule__button--disabled',
        prevEl: '.schedule__button--prev',
        nextEl: '.schedule__button--next',
      };
    },
    ...mapState(['episodes']),
  },
  mounted() {
    this.getEpisodes(this.eventId);
  },
  methods: {
    setSwiper(swiper: ISwiper) {
      this.swiperRef = swiper;
    },
    handleSelect(id: number) {
      this.active = id;
    },
    handleDotClick(id: number) {
      if (!this.swiperRef) return;

      const index = this.episodes.findIndex((episode: IModifiedEpisode) => episode.id === id);

      if (index === -1) return;

      this.handleSelect(this.episodes[index].id);

      this.swiperRef.slideTo(index);
    },
    showNavigation() {
      this.navigationShown = true;
    },
    hideNavigation() {
      this.navigationShown = false;
    },
    showPagination() {
      clearTimeout(this.paginationHideTimeout);

      this.paginationShown = true;

      this.paginationHideTimeout = setTimeout(() => {
        this.paginationShown = false;
      }, 3000);
    },
    ...mapActions(['getEpisodes']),
  },
  components: {
    Swiper,
    SwiperSlide,
    ScheduleItem,
    Icon,
  },
});
</script>

<style lang="scss">
.schedule {
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  background: #f0f0f0;
}

.schedule__swiper {
  width: 80%;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow: visible;

  position: static;
}

.schedule__item {
  width: 32%;
}

.schedule__pagination {
  width: 86% !important;

  position: absolute;
  top: calc(100% + 7.5px);
  bottom: auto !important;
  left: 50% !important;

  display: grid;
  grid-gap: 10px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;

  align-items: center;

  transform: translate(-50%, -50%);
}

.schedule__dot {
  position: relative;

  display: block;

  width: 100%;
  flex: 0 1 100%;
  height: 3px;

  margin: 0 !important;

  border: inset 1px solid transparent;
  background-color: var(--slider-vod-live-fill);
  border-radius: 7px;

  cursor: pointer;
  opacity: 1;

  transform-origin: center center;

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
    height: calc(100% + 2px);

    border-radius: 7px;

    background-color: var(--slider-vod-border);

    transform: translate(-1px, -1px);

    pointer-events: none;
  }

  &:hover {
    height: 5px;
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
    background: var(--system-live-hightlight-gradient);
  }

  &.schedule__dot--active:after {
    z-index: 2;
  }
}

.schedule__navigation {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;

  display: flex;
  justify-content: space-between;

  width: 86%;

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

  &:hover {
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
