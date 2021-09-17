import { App, ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

import type { DefineComponent } from 'vue';
import { ModifiedEpisodesResponse } from './api/types';
import { IStore } from './store/types';

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IStore>;
  }
}

declare module 'vuex' {
  export interface Store<State> {
    app: App;
  }
}
