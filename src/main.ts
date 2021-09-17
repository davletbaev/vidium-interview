import { createApp } from 'vue';
import WebFont from 'webfontloader';

import AppComponent from './App.vue';
import store from './store';

import './assets/styles/global.scss';

WebFont.load({ custom: { families: ['Montserrat'] } });

export const App = createApp(AppComponent).use(store);

App.mount('#app');
