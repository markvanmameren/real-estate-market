<template>
  <div v-if="this.options.visible" class="background" />
  <div v-if="this.options.visible" class="popupContainer">
    <div class="popup">
      <h3 class="headerText">{{ this.options.headerText }}</h3>
      <pre class="bodyText">{{ this.options.bodyText }}</pre>
      <div class="buttons">
        <button
          v-for="button in this.options.buttons"
          :key="button.text"
          :value="button.value"
          @click.stop="buttonClicked"
          :class="button.accent ? 'button accent' : 'button'"
        >
          {{ button.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["buttonClicked"],
  props: {
    options: {
      type: Object,
      default: {
        visible: false,
        headerText: "Delete",
        bodyText: "Are you sure?",
        targetId: "",
        buttons: [
          {
            text: "Yes",
            value: "true",
            accent: true,
          },
          {
            text: "No",
            value: "false",
            accent: false,
          },
        ],
      },
    },
  },
  methods: {
    buttonClicked(event) {
      this.$emit("buttonClicked", event.target.value);
    },
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 98;
  background-color: var(--color-text-primary);
  opacity: 0.7;
}
.popupContainer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  background-color: var(--color-element-background1);
  border-radius: var(--border-radius-small);
  padding: var(--padding-large);
  opacity: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.headerText {
  color: var(--color-text-primary);
  font-family: var(--font-family-header2);
  font-style: var(--font-style-header2);
  font-weight: var(--font-weight-header2);
  font-size: var(--font-size-header2);
}
.bodyText {
  margin: var(--padding-large) 0;
  color: var(--color-text-secondary);
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  white-space: pre-line;
}
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
}
.buttons .button {
  font-family: var(--font-family-buttons-and-tabs);
  font-style: var(--font-style-buttons-and-tabs);
  font-weight: var(--font-weight-buttons-and-tabs);
  font-size: var(--font-size-buttons-and-tabs);
  cursor: pointer;
  text-transform: uppercase;
  padding: var(--padding-small) var(--padding-large);
  border-radius: var(--border-radius-small);
  background-color: var(--color-element-secondary);
  border: 2px solid var(--color-element-secondary);
  color: var(--color-element-background1);
  min-width: 60%;
  margin: 0 auto;
  flex-grow: 1;
  transition: all 0.3s linear;
}
.buttons .button:hover,
.buttons .button:active {
  background-color: transparent;
  color: var(--color-text-secondary);
}
.buttons .button:nth-child(n + 2) {
  /* not the first one*/
  margin-top: var(--padding-medium);
}
.button.accent {
  background-color: var(--color-element-primary);
  border: 2px solid var(--color-element-primary);
}
</style>