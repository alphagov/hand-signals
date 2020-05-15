<template>
  <div class="dropdown-outer" @click="sendMessage(emoji)" @keyup.enter="sendMessage(emoji)" tabindex="0" :aria-label="label" role="button">
    <div class="dropdown-item" tabindex="-1" :class="{ faded: !canPost }">
      <img class="emoji" :src="getEncoded" :alt="getLabel"/>
      <span class="tooltiptext">{{ getLabel }}</span>
    </div>
  </div>
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
      this.$store.dispatch("closeDropdown", "reactions");
      if (this.canPost) {
        this.$store.dispatch("addMessage", {
          messageId: generateUUID(),
          encoded: this.getEncoded,
          username: this.getUsername,
          img: this.$store.getters.getUser("avatar"),
          owner: true,
        });

        this.$socket.sendObj({
          action: "MESSAGE",
          message: {
            id: this.$store.getters.getUser("meetingID"),
            encoded: this.getEncoded,
            username: this.getUsername,
            img: this.$store.getters.getUser("avatar"),
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-outer {
  flex-basis: 25%;
  flex-shrink: 0;
  &:focus > .dropdown-item {
    background-color: rgba(2, 191, 165, 0.15);
    outline: 4px solid rgb(2, 191, 165);
  }
}

.dropdown-item {
  padding: 10px 18px;
  font-size: 15px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  border-radius: 8px;
  margin: 3px;
  &:hover {
    background-color: #00796b0d;
  }
}

.faded {
  opacity: 0.3;
  cursor: default;
  &:hover {
    background-color: white;
  }
}

.emoji {
  width: 100%;
}

.dropdown-item .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: #cdcdcd;
  color: #000000;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: -70px;
  left: 0%;
}

.dropdown-item:hover .tooltiptext {
  visibility: visible;
}
</style>
