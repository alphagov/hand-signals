<template>
  <div class="main-tray">
    <MinimiseButton />
    <div class="tray-inner"
      v-bind:class="[{ open: trayOpen }, trayMimimised ]"
    >
      <SettingsButton />
      <div class="divider"></div>
      <div class="divider"></div>
      <Reaction reaction='Agree' />
      <div class="divider"></div>
      <Reaction reaction='Disagree' />
      <div class="divider"></div>
      <Reaction reaction='Respond' />
      <div class="divider"></div>
      <Reaction reaction='Clarify' />
      <div class="divider"></div>
      <Reaction reaction='Point of Order' />
      <div class="divider"></div>
      <Reaction reaction='Block' />
      <div class="divider"></div>
      <Reaction reaction='Oppose' />
    </div>
  </div>
</template>

<script>
import Reaction from './buttons/Reaction.vue'
import MinimiseButton from "./buttons/MinimiseButton";
import SettingsButton from "./buttons/SettingsButton";

export default {
  components: {
    Reaction,
    MinimiseButton,
    SettingsButton
  },
  props: {
    reaction: String
  },
  computed: {
    trayOpen() {
      return this.$store.state.reactions || this.$store.state.settings;
    },
    trayMimimised: function() {
      return this.$store.state.minimised ? 'tray-inner--minimised' : '';
    }
  }
};
</script>

<style lang="scss">
.main-tray {
  // background-color: rgba(0, 0, 0, 0.541);
  // box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 2px 6px 2px rgba(60, 64, 67, 0.149);
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

  button {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 8px 8px;
  line-height: 1;
  position: relative;
  background: white;
  cursor: pointer;
  svg {
    width: 1em;
    height: 1em;
  }
  img {
    width: 2.5em;
    height: 2.5em;
  }
  &:hover,
  &:focus {
    background-color: rgb(219, 241, 237);
  }
}

  button:hover .tooltip,
  button:focus-visible .tooltip {
    display: block;
  }
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
  transition-duration: 0.25s;
  transition-property: transform border-radius;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  button:last-of-type {
    margin-right: 8px;
  }
}
.tray-inner--minimised{ 
  transform: translateX(-999px);
}

.divider {
  background-color: #f1f3f4;
  margin: 12px 0;
  width: 1px;
}

.open {
  border-radius: 0 0 8px;
}


  
</style>
