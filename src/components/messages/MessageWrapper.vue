<template>
  <div>
    <transition-group name="fading" class="nod-message-wrapper">
      <Message v-for="msg in messages" :key="msg.messageId" :encoded="msg.encoded" :username="msg.username" :img="msg.img" />
      <Hand v-for="hand in hands" :key="hand.messageId" :username="hand.username" :img="hand.img" :messageId="hand.messageId" />
      <Response v-for="response in responses" :key="response.messageId" :username="response.username" :img="response.img" :messageId="response.messageId" />
    </transition-group>
  </div>
</template>

<script>
import Message from "./Message";
import Hand from "./Speak";
import Response from "./Respond";
import { generateUUID, sendNotification } from "../../utils";

export default {
  components: {
    Message,
    Hand,
    Response
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    hands() {
      return this.$store.state.hands;
    },
    responses() {
      return this.$store.state.response;
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
            encoded: d.message.encoded,
            username: d.message.username,
            img: d.message.img,
            owner: false
          });
          break;
        case "QUEUEHAND":
          this.$store.dispatch("addHand", {
            messageId: d.message.messageId,
            username: d.message.username,
            encoded: d.message.encoded,
            img: d.message.img,
            owner: false
          });
          break;
        case "RESPONDQUEUE":
          this.$store.dispatch("addRespond", {
            messageId: d.message.messageId,
            username: d.message.username,
            encoded: d.message.encoded,
            img: d.message.img,
            owner: false
          });

          if (this.$store.state.visible == false && localStorage.getItem("notificationStatus") == "true") {
            chrome.runtime.sendMessage(this.$store.state.extensionID, {
              type: "displayNotification",
              options: {
                title: "Notification from Hand signals",
                message: d.message.username,
                iconUrl: d.message.encoded,
                type: "basic"
              }
            });
          }
          break;
        case "REMOVEHAND":
          this.$store.dispatch("removeHand", d.message.messageId);
          break;
        case "REMOVERESPONSE":
          this.$store.dispatch("removeRespond", d.message.messageId);
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
