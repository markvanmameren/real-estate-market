<template>
  <div class="searchbar-container">
    <input
      type="text"
      ref="searchbar"
      class="searchbar"
      :placeholder="placeholder"
      v-model="text"
      @input="onChange"
    />
    <i class="magnifier"></i>
    <i v-show="text" @click="clearText" class="clear"></i>
  </div>
</template>

<script>
export default {
  emits: ["textChanged"],
  props: {
    placeholder: {
      default: "Search",
      type: String,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    clearText() {
      this.text = "";
      this.$emit("textChanged", this.text);
    },
    onChange() {
      this.$emit("textChanged", this.text);
    },
  },
};
</script>

<style scoped>
.searchbar-container {
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: var(--border-radius-small);
  overflow: hidden;
}

.searchbar-container i {
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  height: 22px;
  width: 22px;
}
.searchbar-container i.magnifier {
  left: 12px;
  pointer-events: none;
  background-image: url("~@/assets/images/ic_search@3x.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 22px;
  width: 22px;
}

.searchbar-container i.clear {
  right: 12px;
  cursor: pointer;
  background-image: url("~@/assets/images/ic_clear@3x.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 22px;
  width: 22px;
}

.searchbar {
  background-color: var(--color-element-tertiary1);
  color: var(--color-text-primary);
  font-family: var(--font-family-inputfield-title);
  font-style: var(--font-style-inputfield-title);
  font-weight: var(--font-weight-inputfield-title);
  font-size: var(--font-size-inputfield-title);
  padding: var(--padding-medium);
  width: 100%;
  height: 100%;
  padding-left: 44px;
  padding-right: 44px;
  border: none;
}
.searchbar::placeholder {
  color: var(--color-element-tertiary2);
}

@media screen and (min-width: 720px) {
  /* desktop */
  .searchbar-container,
  .searchbar {
    width: 400px;
  }
}
</style>