import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import nameFilter from './filter/name.filter';
import Loader from "./components/ui/Loader.vue";
import "./assets/scss/index.scss";

Vue.config.productionTip = false;
Vue.filter('nameFilter', nameFilter);
Vue.component("Loader", Loader);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
