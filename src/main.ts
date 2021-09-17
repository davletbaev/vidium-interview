/* eslint-disable import/prefer-default-export */
import { createApp } from 'vue';
import WebFont from 'webfontloader';

import AppComponent from './App.vue';
import store from './store';
import api from './api';

import './assets/styles/global.scss';

WebFont.load({ custom: { families: ['Montserrat'] } });

export const App = createApp(AppComponent)
  .use(api)
  .use(store);

store.app = App;

App.mount('#app');
