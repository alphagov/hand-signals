<template>
  <div class="explainer">
    <img :src="notificationImg" style="width: 200px;" />
    <div class="explainer-body">
      <div class="nod-pill">New</div>
      <div class="explainer-title"><b>Notifications</b></div>
      Get notified when someone raises their hand and you can't see. Perfect for presenters.
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notificationImg() {
      return `chrome-extension://${this.$store.state.extensionID}/img/notification.png`;
    }
  }
};
</script>

<style lang="scss" scoped>
.explainer {
  position: absolute;
  left: 270px;
  top: -40px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}

.explainer-body {
  padding: 20px;
  padding-top: 0px;
  text-align: left;
  line-height: 130%;
  font-size: 14px;
}

.explainer-title {
  margin-top: 0;
  font-size: 16px;
  color: #202124;
  margin-bottom: 5px;
}

.nod-pill {
  background-color: #00796b;
  border-radius: 100px;
  padding: 2px 8px;
  color: white;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
