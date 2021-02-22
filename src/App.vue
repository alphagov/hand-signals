<template>
  <div id="app">
    <ReactionTray v-if="loaded" />
    <MessageWrapper v-if="loaded" />
  </div>
</template>

<script>
import ReactionTray from "./components/reactions/ReactionTray.vue";
import MessageWrapper from "./components/messages/MessageWrapper.vue";
import { contains } from "./utils";

export default {
  name: "App",
  data() {
    return {
      loaded: false,
    };
  },
  components: {
    ReactionTray,
    MessageWrapper,
  },
  created: function() {
    this.getData();
    this.$socket.onopen = (data) => {
      this.websocketInit();
      this.setupListeners();
    };
  },

  methods: {
    getData() {
      const dataScript = contains("script", "ds:8");
      const userData = JSON.parse(dataScript[1].text.match(/\[[^]*\]/)[0]);
/*      console.log("dataScript")
      console.log(dataScript)*/

      let data = {
        meetingID: document.querySelector("[data-unresolved-meeting-id]").getAttribute("data-unresolved-meeting-id"),
        name: userData[6].split(" ")[0],
        fullName: userData[6],
        team: userData[28],
        avatar: userData[5],
      };
      this.$store.dispatch("addUserData", data);

      const localFullName = localStorage.getItem("nod-isFullName") === "true";
      if (localFullName) {
        this.$store.dispatch("setFullName", localFullName);
      }
    },
    websocketInit() {
      // Display extension
      this.loaded = true;

      // send join message to websocket
      this.$socket.sendObj({
        route: 'join',
        data: {
          id: this.$store.getters.getUser("meetingID"),
          team: this.$store.getters.getUser("team")
        }
      });

      // Send console message
      console.log("%c Initialised Hand Signals Extension.", "background: #4D2F3C; color: #FBE2A0");
      console.log("%c Something gone wrong? Let me know - https://github.com/alphagov/hand-signals/issues", "background: #4D2F3C; color: #FBE2A0");

      // Send ping to keep socket connection open
      const ping = () => {
        console.log("Keeping Hand signals alive...");
        this.$socket.sendObj({ route: "ping" });
      };

      let keepAlive = setInterval(ping, 60000 * 9);
    },

    setupListeners() {
      this.setupTabListener();
      this.setupDestroyListener();
      this.setupVisibilityListeners();
    },

    setupVisibilityListeners() {
      const vm = this;
      document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "hidden") {
          vm.$store.dispatch("setVisible", false);
        } else {
          vm.$store.dispatch("setVisible", true);
        }
      });
    },
    setupTabListener() {
      document.addEventListener("keydown", function(event) {
        if (event.keyCode === 9) {
          if (document.activeElement == document.body || document.activeElement == null) {
            event.preventDefault();
            document.getElementById("nodBtn").focus();
          }
        }
      });
    },

    async setupDestroyListener() {
      window.addEventListener("beforeunload", (event) => {
        this.$socket.sendObj({
          route: "disconnect",
          data: { id: this.$store.getters.getUser("meetingID") }
        });
      });

      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        await new Promise((r) => setTimeout(r, 200));
      }
      this.loaded = false;
      this.$socket.sendObj({
        route: 'disconnect',
        data: { id: this.$store.getters.getUser("meetingID") }
      });
      this.$socket.close();
    },
  },
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100000;
}

/* Styles for Meet */
.pHsCke {
  padding-left: 270px !important;
  box-sizing: border-box;
}
</style>
