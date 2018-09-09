import "muse-ui/dist/muse-ui.css";
import "../resources/material-icons/material-icons.css";

import Vue from "vue";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import MuseUI from "muse-ui";
Vue.use(MuseUI);

if (!process.env.IS_WEB) {
  Vue.use(require("vue-electron"));
}
(<any>Vue).http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");

import { ipcRenderer, remote } from "electron";
import types from "../common/ipcTypes";

ipcRenderer.on(
  types.HAS_HOOK_TEXT,
  (event: Electron.Event, hook: Yagt.TextThread, text: string) => {
    if (!remote.getCurrentWindow().isVisible()) {
      remote.getCurrentWindow().show();
    }
  }
);
