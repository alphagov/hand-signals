<template>
  <div class="main-tray">
    <div class="tray-inner" :class="{ open: trayOpen }">
      <ReactionsButton />
      <div class="divider"></div>
      <HandUpButton />
      <div class="divider"></div>
      <SettingsButton />
    </div>
  </div>
</template>

<script>
import HandUpButton from "./buttons/HandUpButton";
import ReactionsButton from "./buttons/ReactionsButton";
import SettingsButton from "./buttons/SettingsButton";

export default {
  components: {
    HandUpButton,
    ReactionsButton,
    SettingsButton
  },
  computed: {
    trayOpen() {
      return this.$store.state.reactions || this.$store.state.settings;
    }
  },

  created: function() {
    const tone = localStorage.getItem("nod-skinTone");
    if (tone) {
      this.$store.dispatch("setTone", parseInt(tone));
    } else {
      localStorage.setItem("nod-skinTone", 0);
    }
  }
};
</script>

<style lang="scss">
.main-tray {
  background-color: rgba(0, 0, 0, 0.541);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 2px 6px 2px rgba(60, 64, 67, 0.149);
  right: auto;
  animation-name: fade;
  animation-duration: 0.5s;
  z-index: 100000;
  display: flex;
  height: 48px;
  opacity: 1;
  position: absolute;
  top: 0;
  transform: translateY(0);
  transition-duration: 0.25s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  border-radius: 0 0 8px;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tray-inner {
  background-color: #fff;
  display: flex;
  border-radius: 0 0 8px;
}

.divider {
  background-color: #f1f3f4;
  margin: 12px 0;
  width: 1px;
}

.open {
  border-radius: 0;
}

.tray-button {
  display: flex;
  overflow: visible !important;
  padding: 0 10px;

  -webkit-box-align: center;
  box-align: center;
  align-items: center;
  box-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 0;
  color: #5f6368;
  height: 100%;
  min-width: 66px;

  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-font-smoothing: antialiased;
  -webkit-user-select: none;
  transition: background 0.2s 0.1s;
  border: 0;
  cursor: pointer;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.25px;
  line-height: 36px;
  text-decoration: none;
  text-transform: none;
  outline: none;
  position: relative;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  z-index: 0;

  &:hover {
    background-color: transparent;
    .tray-button-bg {
      opacity: 0.04;
    }
  }
}

.tray-button-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00796b;
  opacity: 0;
}
</style>
