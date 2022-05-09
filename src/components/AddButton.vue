<template>
  <!-- desktop button -->
  <button
    type="button"
    @click="buttonClicked"
    class="desktop_button"
    v-if="content.visible"
  >
    <i class="plus" />
    {{ content.text }}
  </button>
  <!-- mobile button -->
  <button
    type="button"
    @click="buttonClicked"
    class="mobile_button"
    v-if="content.visible"
  >
    <i class="plus" />
  </button>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: {
        text: "No Text Specified",
        destination: "/",
        visible: true,
      },
    },
  },
  methods: {
    buttonClicked() {
      // go to page for content.destination
      this.$router.push(this.content.destination)
    },
  },
}
</script>

<style scoped>
.mobile_button,
.desktop_button {
  font-size: var(--font-size-inputfield-title);
  font-family: var(--font-family-inputfield-title);
  font-weight: var(--font-weight-inputfield-title);
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s linear;
  text-transform: uppercase;
  cursor: pointer;
}

.mobile_button {
  background-color: transparent;
  position: absolute;
  right: var(--padding-large);
  visibility: visible;
  color: var(--color-text-primary);
  height: 22px;
  width: 22px;
}
.desktop_button {
  display: none; /* mobile first */
  visibility: hidden; /* mobile first */
  border-radius: var(--border-radius-small);
  background-color: var(--color-element-primary);
  color: var(--color-element-background2);
  border: 2px solid var(--color-element-primary);
  padding: var(--padding-small) var(--padding-large);
}
.mobile_button .plus {
  display: block;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("~@/assets/images/ic_plus_grey@3x.png");
}
.desktop_button .plus {
  display: block;
  background-repeat: no-repeat;
  background-size: contain;
  height: var(--font-size-inputfield-title);
  width: var(--font-size-inputfield-title);
  float: left;
  background-image: url("~@/assets/images/ic_plus_white@3x.png");
  margin: 2px var(--padding-small) 0 0;
}
.desktop_button:hover,
.desktop_button:active {
  background-color: transparent;
  color: var(--color-element-primary);
}

@media screen and (min-width: 720px) {
  /* desktop */
  .desktop_button {
    display: inline-block;
    visibility: visible;
  }
  .mobile_button {
    display: none;
    visibility: hidden;
  }
}
</style>