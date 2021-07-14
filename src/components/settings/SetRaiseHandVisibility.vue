<template>
  <label class="dropdown-item">
    <input type="checkbox" v-model="isVisible" @change="saveState(isVisible)"  />
      Show Raise Hand signal
  </label>
</template>
<script>
  export default {
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      saveState(value){
        this.$store.dispatch("setRaiseHandVisibility", value);
      },
    },
    created() {
      this.isVisible = this.$store.state.isRaiseHandVisible;
    }
  };
</script>