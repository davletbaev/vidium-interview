import { createStore } from 'vuex';

import { App } from '@/main';

export default createStore({
  state: {
    episodes: [],
  },
  mutations: {
    receivedEpisodes(state, episodes) {
      state.episodes = episodes;
    }
  },
  actions: {
    async getEpisodes({ commit }, eventId: string) {
      const episodes = await App.config.globalProperties.$api.timetable.getEpisodes();

      if (!episodes) return null;

      commit('receivedEpisodes', episodes);

      return episodes;
    }
  },
});
