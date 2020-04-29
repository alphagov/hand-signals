<template>
  <div>
    <div
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
      v-if="!notificationStatus"
      @click="turnOnNotifications"
      @keyup.enter="turnOnNotifications"
      class="dropdown-outer"
      tabindex="0"
      aria-label="Turn on Notifications"
      role="button"
    >
      <div class="dropdown-item" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px" class="settings-icon">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
          />
        </svg>
        Turn on Notifications
      </div>
    </div>
    <div v-else @click="turnOffNotifications" @keyup.enter="turnOffNotifications" class="dropdown-outer" tabindex="0" aria-label="Turn off Notifications" role="button">
      <div class="dropdown-item" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="settings-icon">
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          />
        </svg>
        Turn off Notifications
      </div>
    </div>
    <NotificationsExplainer v-if="isHover" />
  </div>
</template>

<script>
import NotificationsExplainer from "./NotificationsExplainer";
export default {
  components: {
    NotificationsExplainer,
  },
  data() {
    return {
      notificationStatus: false,
      isHover: false,
    };
  },
  methods: {
    turnOnNotifications() {
      var vm = this;
      vm.isHover = false;
      chrome.runtime.sendMessage(this.$store.state.extensionID, { type: "notification" }, function(response) {
        vm.notificationStatus = response.permissions;
        localStorage.setItem("notificationStatus", response.permissions);
      });
    },

    turnOffNotifications() {
      this.notificationStatus = false;
      localStorage.setItem("notificationStatus", false);
    },
  },

  created: function() {
    this.notificationStatus = localStorage.getItem("notificationStatus") === "true";
  },
};
</script>

<style lang="scss" scoped>
.dropdown-outer {
  &:focus > .dropdown-item {
    background-color: rgba(2, 191, 165, 0.15);
    outline: 4px solid rgb(2, 191, 165);
  }
}

.dropdown-item {
  padding: 5px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    background-color: #00796b0d;
  }
}

.settings-icon {
  margin-right: 10px;
  fill: #3c4043;
}
</style>
