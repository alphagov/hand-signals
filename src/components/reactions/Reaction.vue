<template>
  <button class="tray-button"
    @click="sendMessage(emoji)" 
    @keyup.enter="sendMessage(emoji)"
    aria-label="label" 
    role="button"
    >
    <div class="tray-button-bg"></div>
    <img class="emoji" :src="getEncoded" :alt="getLabel" style="height: 32px; width: 32px;"/>
    <span class="tooltiptext">{{ getLabel }}</span>
  </button>
</template>

<script>
import { generateUUID } from "../../utils/index";

export default {
  props: {
    encoded: String,
    text: String,
    label: String
  },

  computed: {
    canPost() {
      return this.$store.state.messages.filter((h) => h.owner === true).length < 1;
    },
    getEncoded() {
          return `${this.encoded}`;
    },
    getLabel() {
          return `${this.label}`;
    },
    getUsername() {
      if (this.$store.state.isFullName) {
        return this.$store.getters.getUser("fullName");
      } else {
        return this.$store.getters.getUser("name");
      }
    },
  },
  methods: {
    sendMessage(emoji) {
      if (this.canPost) {
        this.$store.dispatch("addMessage", {
          messageId: generateUUID(),
          encoded: this.getEncoded,
          username: this.getUsername,
          img: this.$store.getters.getUser("avatar"),
          owner: true
        });

        this.$socket.sendObj({
          action: "MESSAGE",
          message: {
            id: this.$store.getters.getUser("meetingID"),
            encoded: this.getEncoded,
            username: this.getUsername,
            img: this.$store.getters.getUser("avatar")
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tray-button {
  flex-basis: 25%;
  flex-shrink: 1;
  &:focus,
  &:hover{
    background-color: rgb(219, 241, 237);
  }
}

.emoji {
  width: 100%;
}
</style>
