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

    <ScheduleNavigation
      v-show="navigationShown"
      @click="showPagination"
    />

    <SchedulePagination
      v-show="paginationShown"
      :active="active"
      :items="episodes"
      @dot:click="handleDotClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState, MutationPayload } from 'vuex';
import SwiperCore, { Navigation, Mousewheel, Swiper as ISwiper } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import ScheduleItem from '@/components/ScheduleItem.vue';
import ScheduleNavigation from '@/components/ScheduleNavigation.vue';
import SchedulePagination from '@/components/SchedulePagination.vue';
import { IModifiedEpisode } from '@/api/types';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { IStore } from '@/store/types';

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

    this.$store.subscribe(this.episodesSubscriptionCallback);
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
    episodesSubscriptionCallback(mutation: MutationPayload, state: IStore) {
      if (mutation.type !== 'receivedEpisodes' || !mutation.payload.length) return;

      const liveEpisodeIndex = this.episodes.findIndex(({ started, stopped }: IModifiedEpisode) => started && !stopped);

      if (liveEpisodeIndex === -1) return;
      if (!this.swiperRef) return;

      this.handleSelect(this.episodes[liveEpisodeIndex].id);

      this.swiperRef.slideTo(liveEpisodeIndex);
    },
    ...mapActions(['getEpisodes']),
  },
  components: {
    Swiper,
    SwiperSlide,
    ScheduleItem,
    ScheduleNavigation,
    SchedulePagination,
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
</style>
