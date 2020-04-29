<template>
  <div>
    <transition-group name="fading" class="nod-message-wrapper">
      <Message v-for="msg in messages" :key="msg.messageId" :emoji="msg.emoji" :username="msg.username" :img="msg.img" :tone="msg.tone" />
      <Hand v-for="hand in hands" :key="hand.messageId" :username="hand.username" :img="hand.img" :messageId="hand.messageId" :tone="hand.tone" />
    </transition-group>
  </div>
</template>

<script>
import Message from "./Message";
import Hand from "./Speak";
import { generateUUID, sendNotification } from "../../utils";

export default {
  components: {
    Message,
    Hand
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    hands() {
      return this.$store.state.hands;
    }
  },
  created: function() {
    this.$options.sockets.onmessage = ({ data }) => {
      const d = JSON.parse(data);
      switch (d.action) {
        case "MESSAGE":
          this.$store.dispatch("addMessage", {
            messageId: d.message.messageId || generateUUID(),
            emoji: d.message.emoji,
            username: d.message.username,
            img: d.message.img,
            owner: false,
            tone: d.message.tone
          });
          break;
        case "QUEUE":
          this.$store.dispatch("addHand", {
            messageId: d.message.messageId,
            username: d.message.username,
            img: d.message.img,
            owner: false,
            tone: d.message.tone
          });

          if (this.$store.state.visible == false && localStorage.getItem("notificationStatus") == "true") {
            chrome.runtime.sendMessage(this.$store.state.extensionID, {
              type: "displayNotification",
              options: {
                title: "Notification from Nod",
                message: d.message.username,
                iconUrl: d.message.tone
                  ? `chrome-extension://${this.$store.state.extensionID}/img/hand.gif`
                  : `chrome-extension://${this.$store.state.extensionID}/img/hand.gif`,
                type: "basic"
              }
            });
          }
          break;
        case "REMOVE":
          this.$store.dispatch("removeHand", d.message.messageId);
          break;
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.fading-enter {
  opacity: 0;
}
.fading-leave-to {
  opacity: 0;
  margin-bottom: -50px;
}
.nod-message-wrapper {
  position: fixed;
  bottom: 100px;
  left: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
