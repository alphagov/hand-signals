import Vue from "vue";
import App from "./App.vue";
import VueNativeSock from "vue-native-websocket";
import store from "./store/store";

Vue.config.productionTip = false;

Vue.use(VueNativeSock, "wss://aqr57o3uuk.execute-api.eu-west-2.amazonaws.com/prod", {
  format: "json"
});

new Vue({
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
