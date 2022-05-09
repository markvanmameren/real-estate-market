<template>
  <nav class="menu desktop">
    <slot name="links" />
  </nav>
  <nav class="menu mobile">
    <slot name="links" />
  </nav>
</template>

<style>
/* not scoped because of slot */
.menu.desktop {
  display: none; /* mobile first */
  visibility: hidden; /* mobile first */
  flex-direction: row;
  flex-wrap: wrap;
}

.menu.desktop i {
  display: none;
  visibility: hidden;
}

.menu.desktop a {
  color: var(--color-text-primary);
  padding: var(--padding-medium);
  font-size: var(--font-size-buttons-and-tabs);
  font-family: var(--font-family-buttons-and-tabs);
  font-weight: var(--font-weight-buttons-and-tabs);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.1s linear;
}

.menu.desktop a:hover,
.menu.desktop a:active,
.menu.desktop .router-link-active {
  color: var(--color-element-primary);
  border-color: var(--color-element-primary);
}

.menu.mobile {
  display: flex; /* mobile first */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  padding: var(--padding-medium);
  background-color: var(--color-element-background2);
  box-shadow: 0 0 10px 0 var(--color-shadow);
  transition: all 0.3s linear;
}

.menu.mobile .linktitle {
  display: none;
  visibility: hidden;
}

.menu.mobile a {
  color: var(--color-text-primary);
  font-size: var(--font-size-buttons-and-tabs);
  font-family: var(--font-family-buttons-and-tabs);
  font-weight: var(--font-weight-buttons-and-tabs);
  text-decoration: none;
  transition: all 0.3s linear;
}

@media screen and (min-width: 720px) {
  /* desktop */
  .menu.desktop {
    display: flex;
    visibility: visible;
  }
  .menu.mobile {
    display: none;
    visibility: hidden;
  }
}
</style>