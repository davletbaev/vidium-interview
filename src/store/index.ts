import { createStore } from 'vuex';

import { IStore } from './types';

export default createStore<IStore>({
  state: {
    episodes: [],
  },
  mutations: {
    receivedEpisodes(state, episodes) {
      state.episodes = episodes;
    },
  },
  actions: {
    async getEpisodes({ commit }, eventId: string) {
      const episodes = await this.app.config.globalProperties.$api.timetable.getEpisodes(eventId);

      if (!episodes) return null;

      console.log(episodes);

      commit('receivedEpisodes', episodes);

      return episodes;
    },
  },
});
