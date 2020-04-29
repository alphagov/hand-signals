<template>
  <div @click="checkUpdate" @keyup.enter="checkUpdate" class="dropdown-outer" tabindex="0" aria-label="Check for update" role="button">
    <div class="dropdown-item" tabindex="-1">
      <!-- If check hasnt happened -->

      <svg v-if="!$store.state.updateChecked" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="settings-icon">
        <path d="M0 .5h24v24H0z" fill="none" />
        <path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z" />
      </svg>
      <span v-if="!$store.state.updateChecked">Check for Update</span>

      <!-- If update is available -->
      <svg v-if="updateAvailable" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="settings-icon">
        <path
          d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
      <a v-if="updateAvailable" @click="reload()" @keyup.enter="reload()" tabindex="0" aria-label="Reload page to update" role="button">Click to update</a>

      <!-- If no update is available -->
      <svg v-if="noUpdateAvailable" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="settings-icon faded">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
      </svg>
      <span v-if="noUpdateAvailable" class="faded">On latest version</span>

      <!-- <span v-if="noUpdateAvailable" class="faded">On latest version</span> -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    updateAvailable() {
      return this.$store.state.updateAvailable == true && this.$store.state.updateChecked;
    },
    noUpdateAvailable() {
      return this.$store.state.updateAvailable == false && this.$store.state.updateChecked;
    },
  },
  methods: {
    checkUpdate() {
      const store = this.$store;
      store.dispatch("setUpdateChecked", true);

      chrome.runtime.sendMessage(this.$store.state.extensionID, { reload: true }, function(response) {
        store.dispatch("setUpdateStatus", response.updateAvailable);
      });
    },

    reload() {
      location.reload();
    },
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

.faded {
  opacity: 0.3;
}
</style>
