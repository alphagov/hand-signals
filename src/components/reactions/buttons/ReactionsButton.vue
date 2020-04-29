<template>
  <div id="nodBtn" class="tray-button-outer" tabindex="0" @mouseover="openReactions" @mouseleave="closeReactions" @keyup.enter="openReactions" @keyup.esc="closeReactions">
    <a class="tray-button" tabindex="-1" aria-label="Open Nod extension" role="button">
      <div class="tray-button-bg"></div>
      <img :src="getHand" style="height: 42px;" />
      <ReactionsDropdown v-if="this.$store.state.reactions" />
    </a>
  </div>
</template>

<script>
import ReactionsDropdown from "../ReactionsDropdown";

export default {
  components: {
    ReactionsDropdown,
  },
  computed: {
    getHand() {
      return `chrome-extension://${this.$store.state.extensionID}/img/speak.png`;
    },
    getUsername() {
      if (this.$store.state.isFullName) {
        return this.$store.getters.getUser("fullName");
      } else {
        return this.$store.getters.getUser("name");
      }
    }
  },
  methods: {
    openReactions: function() {
      this.$store.dispatch("openDropdown", "reactions");
    },
    closeReactions: function() {
      this.$store.dispatch("closeDropdown", "reactions");
    },
  },
};
</script>

<style lang="scss" scoped>
.tray-button-outer {
  &:focus > .tray-button {
    background-color: rgba(2, 191, 165, 0.15);
  }
}
</style>
