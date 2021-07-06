<template>
  <div class="dropdown">
    <NameDisplay />
    <div class="kCtYwe" role="separator"></div>

    <NotificationsButton />
    <UpdateButton />

    <div class="kCtYwe" role="separator"></div>

    <div class="dropdown-outer" tabindex="0" aria-label="Report an Issue" role="button">
      <a href="https://github.com/alphagov/hand-signals/issues" target="_blank" class="dropdown-item" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="settings-icon">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2.02c-5.51 0-9.98 4.47-9.98 9.98s4.47 9.98 9.98 9.98 9.98-4.47 9.98-9.98S17.51 2.02 12 2.02zM11.48 20v-6.26H8L13 4v6.26h3.35L11.48 20z" />
        </svg>
        Feature Request
      </a>
    </div>
    <div class="dropdown-outer" tabindex="0" aria-label="Report an Issue" role="button" style="margin-bottom:5px;">
      <a href="https://github.com/alphagov/hand-signals/issues" target="_blank" class="dropdown-item" tabindex="-1">
        <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="settings-icon">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12z"></path>
          <path d="M11 12h2v2h-2zm0-6h2v4h-2z"></path>
        </svg>
        Report an Issue
      </a>
    </div>
    <AdBtn />
  </div>
</template>

<script>
import NotificationsButton from "./NotificationsButton";
import UpdateButton from "./UpdateButton";
import NameDisplay from "./NameDisplay";

export default {
  components: {
    NotificationsButton,
    UpdateButton,
    NameDisplay,
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: fixed;
  top: 48px;
  left: 0;
  background-color: white;
  border-top: 1px solid #eee;
  border-radius: 0 0 8px 0;
  width: 260px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 6px 6px 2px rgba(60, 64, 67, 0.149);
  padding-bottom: 0px;
}

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
  color: #5f6368;
  &:hover {
    background-color: #00796b0d;
  }
}

.settings-icon {
  margin-right: 10px;
  fill: #3c4043;
}
</style>
