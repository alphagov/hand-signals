<template>
  <div class="dropdown-outer" aria-label="Check for update" role="button">
    <div class="dropdown-item">
      <div class="user-wrapper">
        <img :src="avatar" class="nod-avatar" />
        {{ name }}
      </div>
      <div class="next-btn" @click="toggleNameDisplay">
        <svg v-if="this.$store.state.isFullName" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none" />
          <path
            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
          />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { contains } from "../../utils";
export default {
  methods: {
    toggleNameDisplay() {
      this.$store.dispatch("setFullName", !this.$store.state.isFullName);
      localStorage.setItem("nod-isFullName", this.$store.state.isFullName);
    },

    truncate(text) {
      var content = text.trim();
      content = content.split("").slice(0, 15);
      if (content.length < 15) {
        content = content.join("");
      } else {
        content = content.join("") + "...";
      }
      return content;
    }
  },
  computed: {
    avatar() {
      return this.$store.getters.getUser("avatar");
    },
    name() {
      return this.$store.state.isFullName ? this.truncate(this.$store.getters.getUser("fullName")) : this.truncate(this.$store.getters.getUser("name"));
    }
  }
};
</script>

<style lang="scss" scoped>
.nod-avatar {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-right: 10px;
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
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: #5f6368;
}

.user-wrapper {
  display: flex;
  align-items: center;
}

.next-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
  fill: #5f6368;

  border-radius: 4px;

  &:hover {
    background-color: #00796b0d;
  }
}
</style>
