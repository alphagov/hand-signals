<template>
  <div>
    <transition-group name="fading" class="nod-message-wrapper">
      <Message v-for="msg in messages" :key="msg.messageId" :encoded="msg.encoded" :username="msg.username" :img="msg.img" />
      <Hand v-for="hand in hands" :key="hand.messageId" :username="hand.username" :img="hand.img" :messageId="hand.messageId" />
      <Response v-for="response in responses" :key="response.messageId" :username="response.username" :img="response.img" :messageId="response.messageId" />
    </transition-group>
  </div>
</template>

<script>
import Message from "./Message";
import Hand from "./Speak";
import Response from "./Respond";
import { generateUUID, sendNotification } from "../../utils";

export default {
  components: {
    Message,
    Hand,
    Response
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    hands() {
      return this.$store.state.hands;
    },
    responses() {
      return this.$store.state.response;
    }
  },
  created: function() {
    this.$options.sockets.onmessage = ({ data }) => {
      const d = JSON.parse(data);
      switch (d.action) {
        case "MESSAGE":
          this.$store.dispatch("addMessage", {
            messageId: d.message.messageId || generateUUID(),
            emoji: d.message.emoji,
            encoded: d.message.encoded,
            username: d.message.username,
            img: d.message.img,
            owner: false
          });
          break;
        case "QUEUE":
          this.$store.dispatch("addHand", {
            messageId: d.message.messageId,
            username: d.message.username,
            img: d.message.img,
            owner: false
          });

          if (this.$store.state.visible == false && localStorage.getItem("notificationStatus") == "true") {
            chrome.runtime.sendMessage(this.$store.state.extensionID, {
              type: "displayNotification",
              options: {
                title: "Notification from Hand signals",
                message: d.message.username,
                iconUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAACXBIWXMAAC4jAAAuIwF4pT92AAAJv2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTI4VDE5OjUxOjA2KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA0LTI4VDE5OjU5OjE1KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNC0yOFQxOTo1OToxNSswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZTNjZTNmMGQtNzg5MC1lOTRhLWJiYTMtOGU5YzhlNDRmNWNkIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZDQzYzYzMzYtYTc2ZC0wZTQ0LTg5YmMtZGNiYzU0NDU1N2NkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTU2NTQ2NTYtYjhmMi1mMTRiLTllNDQtZDkwN2UxODY3Y2E1IiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUyNiIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjUyNiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTU2NTQ2NTYtYjhmMi1mMTRiLTllNDQtZDkwN2UxODY3Y2E1IiBzdEV2dDp3aGVuPSIyMDIwLTA0LTI4VDE5OjUxOjA2KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmIwZjFlZWEzLTMwNzUtMWQ0OS05YzJjLTcyNmNhMWE0ZmMzMSIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0yOFQxOTo1OToxNSswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplM2NlM2YwZC03ODkwLWU5NGEtYmJhMy04ZTljOGU0NGY1Y2QiIHN0RXZ0OndoZW49IjIwMjAtMDQtMjhUMTk6NTk6MTUrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4xIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjBmMWVlYTMtMzA3NS0xZDQ5LTljMmMtNzI2Y2ExYTRmYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1NjU0NjU2LWI4ZjItZjE0Yi05ZTQ0LWQ5MDdlMTg2N2NhNSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU1NjU0NjU2LWI4ZjItZjE0Yi05ZTQ0LWQ5MDdlMTg2N2NhNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjuEagoAAA36SURBVHiczZx/dFTVncA/7735lUnIJBlCEkggIUgltJSirkWE6FYU7bKue3btkbq1RXQXT7dH3e5WrLvV7YnH6m67nhW10JWypxYrLlZQ6IFTpVvYBQVB0EgChl8JM8lMJsn8Smbmzcz+8TIvM5NkMvPmvWw/53CYue++7/fON/fH9977vVfo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`,
                type: "basic"
              }
            });
          }
          break;
        case "REMOVE":
          this.$store.dispatch("removeHand", d.message.messageId);
          break;
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.fading-enter {
  opacity: 0;
}
.fading-leave-to {
  opacity: 0;
  margin-bottom: -50px;
}
.nod-message-wrapper {
  position: fixed;
  bottom: 100px;
  left: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
