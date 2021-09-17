import { createApp } from 'vue';
import WebFont from 'webfontloader';

import App from './App.vue';
import store from './store';

import './assets/styles/global.scss';

WebFont.load({ custom: { families: ['Montserrat'] } });

createApp(App).use(store).mount('#app');
