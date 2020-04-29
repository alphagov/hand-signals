<template>
  <div @mouseenter.self="mouseIn" @mouseleave.self="mouseOut" @click="removeHand(messageId)" class="nod-message">
    <div class="nod-emoji-wrapper">
      <img v-if="hover" :src="getCloseButton" alt="Remove icon" class="nod-emoji" />
      <img v-else :src="getEmoji" alt="I want to speak" class="nod-emoji" />
    </div>
    <img :src="img" :alt="username" class="nod-avatar" />
    {{ username }}
  </div>
</template>

<script>
export default {
  computed: {
    getEmoji() {
        return `chrome-extension://${this.$store.state.extensionID}/img/speak.png`;
      },
    getCloseButton() {
      return `chrome-extension://${this.$store.state.extensionID}/img/down.png`;
    }
  },
  props: {
    username: String,
    img: String,
    messageId: String
  },
  data() {
    return {
      hover: false
    };
  },
  methods: {
    mouseIn() {
      this.hover = true;
    },
    mouseOut() {
      this.hover = false;
    },
    removeHand(key) {
      // Remove local copy from store
      this.$store.dispatch("removeHand", key);
      // Send one over the websocket to other users
      this.$socket.sendObj({
        action: "REMOVE",
        message: {
          id: this.$store.getters.getUser("meetingID"),
          messageId: key
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.nod-message {
  opacity: 1;
  height: auto;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 5px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1px 2px 10px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  flex-shrink: 1;
  cursor: pointer;
}
.nod-avatar {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.nod-emoji {
  max-width: 26px;
  transition: all 0.3s ease;
}

.nod-emoji-wrapper {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: -20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 10px;
  overflow: hidden;
}
</style>
