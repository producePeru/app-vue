import { createApp } from 'vue';

const eventBus = createApp({});
eventBus.config.globalProperties.eventBus = {
  events: {},
  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(...args);
      });
    }
  }
};

export default eventBus;
