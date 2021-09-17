import { App } from 'vue';
import { createStore } from 'vuex';

declare module 'vuex' {
  export interface Store<S> {
    app: App;
  }
}

export default createStore({
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

      commit('receivedEpisodes', episodes);

      return episodes;
    },
  },
});
