import { createApp } from 'vue';
import App from './App.vue';

export function mount(mountPoint) {
  createApp(App).mount(mountPoint);
}

