import { App } from 'vue';

import config from './config';
import { EpisodesResponse, IModifiedEpisode } from './types';

import dummyData from './dummyData';

const timetable = {
  async getEpisodes(eventId: string) {
    try {
      const response = await fetch(`${config.base}v1/events/${eventId}/timetable/episodes`);
      const data: EpisodesResponse = await response.json();

      return data.map(
        ({
          startTime, stopTime, lines, ...restProps
        }) => <IModifiedEpisode>{
          started: Boolean(startTime),
          stopped: Boolean(stopTime),
          startTime,
          stopTime,
          title: lines.title,
          ...restProps,
        },
      );
    } catch (e) {
      // Заглушка на случай недоступности основного API на время разработки
      return dummyData.map(
        ({
          startTime, stopTime, lines, ...restProps
        }) => <IModifiedEpisode>{
          started: Boolean(startTime),
          stopped: Boolean(stopTime),
          startTime,
          stopTime,
          title: lines.title,
          ...restProps,
        },
      );;
    }
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
