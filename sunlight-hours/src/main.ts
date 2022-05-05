import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Card from "primevue/card";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "/node_modules/primeflex/primeflex.css";
createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .component("Card", Card)
  .mount("#app");
