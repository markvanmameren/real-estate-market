<template>
  <div class="sort-container" :class="sortDirection">
    <div
      class="sort-option"
      v-for="sortOption in sortOptions"
      :key="sortOption.type"
      :id="sortOption.type"
      @click="buttonClick"
      :class="{ selected: sortOption.isSelected }"
    >
      {{ sortOption.type }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ["sortOptionSelected"],
  props: {
    sortOptions: {},
    sortDirection: "",
  },
  methods: {
    buttonClick(event) {
      this.$emit("sortOptionSelected", event.target.id);
    },
  },
};
</script>

<style scoped>
.sort-container {
  display: flex; /* mobile first */
  border-radius: var(--border-radius-small);
  overflow: hidden;
  color: var(--color-element-background2);
  background-color: var(--color-element-tertiary2);
  margin: var(--padding-large) auto 0; /* mobile first */
  height: 100%;
  width: 100%;
  text-align: center;
}
.sort-option {
  display: inline-block;
  padding: var(--padding-small) var(--padding-large);
  font-size: var(--font-size-inputfield-title);
  font-family: var(--font-family-inputfield-title);
  font-weight: var(--font-weight-inputfield-title);
  text-decoration: none;
  transition: all 0.3s linear;
  text-transform: uppercase;
  cursor: pointer;
  flex-grow: 1;
  height: 100%;
}
.sort-option:hover,
.sort-option:active,
.sort-option.selected {
  background-color: var(--color-element-primary);
}
.sort-option.selected::after {
  margin-left: var(--padding-small);
  font-size: 0.9em;
  transition: all 0.3s linear;
}
.asc .sort-option.selected::after {
  content: "\25B2"; /* arrow up */
}
.desc .sort-option.selected::after {
  content: "\25BC"; /* arrow down */
}
@media screen and (min-width: 720px) {
  /* desktop */
  .sort-container {
    display: inline-block;
    margin: 0;
    width: auto;
  }
}
</style>