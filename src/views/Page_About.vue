<template>
  <div class="page about">
    <h3>About DTT Real Estate</h3>
    <p>
      This app was developed by Mark van Mameren in 2022, on behalf of digital
      agency DTT.
    </p>
    <h3>Design and Development</h3>
    <div class="creditsContainer">
      <div class="logoInline" />
      <span>By DTT</span>
      <a href="www.d-tt.nl">www.d-tt.nl</a>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("hideHeaderButton");
    this.$store.commit("hideBackgroundImage");
    this.$store.commit("hideBackButton");
    this.$store.commit("showPageTitle");
  },
};
</script>

<style scoped>
h3 {
  color: var(--color-text-primary);
  font-family: var(--font-family-header2);
  font-style: var(--font-style-header2);
  font-weight: var(--font-weight-header2);
  font-size: var(--font-size-header2);
  margin-bottom: var(--padding-small);
}
p,
a,
span {
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-text-secondary);
}
p {
  margin-bottom: var(--padding-large);
}
a {
  text-decoration: none;
  color: var(--color-text-hyperlink);
}
.creditsContainer {
  display: grid;
  grid-template-columns: 2;
  width: 100%;
  max-width: 300px;
}
span {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  color: var(--color-text-secondary);
}
a {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
  color: var(--color-text-hyperlink);
}
.logoInline {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: span 2;
  margin-right: var(--padding-medium);
  background-image: url("../assets/images/img_logo_dtt@3x.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
}
</style>