<template>
    <button 
      class="minimise-btn" 
      tabindex="0" aria-label="Minimise tray" role="button"
      v-bind:class="toggleIcon"
      @keyup.enter="toggleTrayVisibility"
      @click="toggleTrayVisibility"
    >
      <svg style="display: none;">
        <symbol id="icon-circle-right" viewBox="0 0 32 32">
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
          <path d="M11.086 22.086l2.829 2.829 8.914-8.914-8.914-8.914-2.828 2.828 6.086 6.086z"></path>
        </symbol>
        <symbol id="icon-circle-left" viewBox="0 0 32 32">
          <path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13z"></path>
          <path d="M20.914 9.914l-2.829-2.829-8.914 8.914 8.914 8.914 2.828-2.828-6.086-6.086z"></path>
        </symbol>
      </svg>
      <span class="DPvwYc sm8sCf SX67K" aria-hidden="true">
        <svg class="icon icon-circle-left"><use xlink:href="#icon-circle-left"></use></svg>
        <svg class="icon icon-circle-right"><use xlink:href="#icon-circle-right"></use></svg>
      </span>
    </button>
</template>

<script>

export default {
  components: {
  },
  methods: {
    toggleTrayVisibility() {
      if (this.$store.state.minimised) {
        this.$store.dispatch("setMinimised" , false);
          return true
      } else {
        this.$store.dispatch("setMinimised" , true);
        return false
      }
    }
  },
  computed: {
    toggleIcon: function () {
      return this.$store.state.minimised ? 'minimise-btn--active' : ''
    }
  }
};
</script>

<style lang="scss" scoped>

.icon {
  display: flex;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.icon-circle-right {
  display: none;
}
.minimise-btn {
  background: #fff;
  position: relative;
  z-index: 1;
  
  &:hover,
  &:focus {
     background-color: rgb(219, 241, 237);
  }

  &--active{
    border-radius: 0 0 8px;
    .icon-circle-right {
      display: inline-block;
    }
    .icon-circle-left {
      display: none;
    }
  }
}
</style>
