import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // TODO - SWITCH BACK TO PROD
    extensionID: "npkagcojnlkccpdcgokfijkbhmlkglnl", //PROD: oikgofeboedgfkaacpfepbfmgdalabej / DEV: cpdaoleiojomipifgjmkjjkmfecanfdo
    userData: {},
    messages: [],
    hands: [],
    reactions: false,
    settings: false,
    updateAvailable: false,
    updateChecked: false,
    visible: true,
    isFullName: false,
    tone: 0,
  },

  getters: {
    getUser: (state) => (key) => {
      return state.userData[key];
    },
  },

  mutations: {
    addMessage(state, data) {
      state.messages.unshift(data);
    },
    removeMessage(state, messageData) {
      state.messages = state.messages.filter((message) => message != messageData);
    },
    addHand(state, data) {
      state.hands.unshift(data);
    },
    removeHand(state, id) {
      state.hands = state.hands.filter((hand) => hand.messageId != id);
    },
    addUserData(state, data) {
      state.userData = data;
    },
    openDropdown(state, dropdown) {
      state[dropdown] = true;
    },
    closeDropdown(state, dropdown) {
      state[dropdown] = false;
    },
    setUpdateStatus(state, boolean) {
      state.updateAvailable = boolean;
    },
    setUpdateChecked(state, boolean) {
      state.updateChecked = boolean;
    },
    setVisible(state, boolean) {
      state.visible = boolean;
    },
    setTone(state, int) {
      state.tone = int;
    },
    setFullName(state, boolean) {
      state.isFullName = boolean;
    },
  },

  actions: {
    addMessage(context, messageData) {
      context.commit("addMessage", messageData);
      setTimeout(() => {
        context.commit("removeMessage", messageData);
      }, 3000);
    },

    addHand(context, messageData) {
      context.commit("addHand", messageData);
    },

    removeHand(context, id) {
      context.commit("removeHand", id);
    },

    openDropdown(context, dropdown) {
      context.commit("openDropdown", dropdown);
    },
    closeDropdown(context, dropdown) {
      context.commit("closeDropdown", dropdown);
    },
    addUserData(context, data) {
      context.commit("addUserData", data);
    },
    setUpdateStatus(context, boolean) {
      context.commit("setUpdateStatus", boolean);
    },
    setUpdateChecked(context, boolean) {
      context.commit("setUpdateChecked", boolean);
    },
    setVisible(context, boolean) {
      context.commit("setVisible", boolean);
    },
    setTone(context, int) {
      context.commit("setTone", int);
    },
    setFullName(context, boolean) {
      context.commit("setFullName", boolean);
    },
  },
});
