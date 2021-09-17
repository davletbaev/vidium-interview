import { App } from 'vue';

import config from './config';
import { EpisodesResponse, IModifiedEpisode } from './types';

const timetable = {
  async getEpisodes(eventId: string) {
    try {
      const response = await fetch(
        `${ config.base }v1/events/${eventId}/timetable/episodes`,
      );
      const data: EpisodesResponse = await response.json();

      return data.map(
        ({ startTime, stopTime, ...restProps }) => <IModifiedEpisode>{
          started: Boolean(startTime),
          stopped: Boolean(stopTime),
          startTime,
          stopTime,
          ...restProps,
        },
      );
    } catch (e) {}
  },
};

export default {
  install: (app: App) => {
    const endpoints = {
      timetable,
    };

    app.config.globalProperties.$api = endpoints;
  },
};
