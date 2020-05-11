<template>
  <div class="nod-message">
    <div class="nod-emoji-wrapper">
      <img :src="getEmoji" :alt="emoji" class="nod-emoji" />
    </div>
    <img :src="img" :alt="username" class="nod-avatar" />
    {{ username }}
  </div>
</template>

<script>
export default {
  computed: {
    getEmoji() {
      return `${this.encoded}`;
    }
  },

  props: {
    username: String,
    emoji: String,
    encoded: String,
    img: String
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
}
.nod-avatar {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.nod-emoji {
  width: 80%;
  max-width: 42px;
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
