<template>
  <div class="dropdown" id="reactions-dropdown">
    <Reaction emoji="response" label="I want to respond" />
    <Reaction emoji="agree" label="I agree" />
    <Reaction emoji="disagree" label="I disagree" />
    <Reaction emoji="clarify" label="I need clarification" />
    <Reaction emoji="order" label="Raise a Point of Order" />
    <Reaction emoji="block" label="I block" />
    <Reaction emoji="oppose" label="I oppose" />
  </div>
</template>

<script>
import Reaction from "./Reaction";
export default {
  components: {
    Reaction,
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  animation: fade 0.2s;
  position: absolute;
  top: 48px;
  left: 0;
  background-color: white;
  border-top: 1px solid #eee;
  border-radius: 0 0 8px 0;
  width: 260px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 6px 6px 2px rgba(60, 64, 67, 0.149);
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>
