<template>
  <div class="noResultsPlaceholder">
    <div class="noResultsImage" />
    <pre class="noResultsText">{{ this.msg }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "No results",
    },
  },
};
</script>

<style>
.noResultsPlaceholder {
  margin-top: var(--padding-large);
  flex-direction: column;
  width: 100%;
}
.noResultsPlaceholder .noResultsImage {
  background-image: url("../assets/images/img_empty_houses@3x.png");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 50%;
  height: 30vh;
  max-width: 720px;
  margin: 0 auto;
}
.noResultsPlaceholder .noResultsText {
  margin-top: var(--padding-large);
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-text-secondary);
  text-align: center;
  white-space: pre-line;
}
</style>