<template>
  <div
    class="content-container"
    :class="{ backgroundVisible: $store.getters.getBackgroundImageVisible }"
  >
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import objectContainsString from "./mixins/objectContainsString";
import priceFormatting from "./mixins/priceFormatting";

export default {
  components: {
    Header,
  },
  mixins: [objectContainsString, priceFormatting],
  created() {
    // fetch houses from API when createds
    this.$store.dispatch("fetchHousesFromAPI");
  },
  watch: {
    $route: {
      // set page title based on $route
      immediate: true,
      handler(to, from) {
        const siteName = "DTT Real Estate";
        let pageName = this.$route.name;
        const params = this.$route.params;
        // Change page name when editting listing instead of adding new
        if (pageName == "Create new listing" && params && params.id) {
          pageName = "Edit listing";
        }
        if (typeof pageName == "undefined") {
          document.title = siteName;
        } else {
          document.title = siteName + " | " + pageName;
        }
      },
    },
  },
};
</script>

<style>
/* CSS Reset */
* {
  box-sizing: border-box;
  border: none;
  white-space: normal;
  word-wrap: normal;
  outline: 0;
  padding: 0;
  margin: 0;
}

/* Font imports */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,500&family=Open+Sans:wght@400;600&display=swap");

/* Style variables for colors and fonts */
:root {
  --desktop-max-width: 1080px;

  /* Colors for elements */
  --color-element-primary: #eb5440;
  --color-element-secondary: #4a4b4c;
  --color-element-tertiary1: #e8e8e8;
  --color-element-tertiary2: #c3c3c3;
  --color-element-background1: #f6f6f6;
  --color-element-background2: #ffffff;

  /* Colors for text */
  --color-text-primary: #000000;
  --color-text-secondary: #4a4b4c;
  --color-text-hyperlink: #067bc2;

  /* Shadow color */
  --color-shadow: rgba(74,75,76,0.2); /* transparent version from element secondary */

  /* Border-radius */
  --border-radius-small: 8px;
  --border-radius-large: 20px;

  /* Padding */
  --padding-small: 10px;
  --padding-medium: 15px;
  --padding-large: 25px;

  /* Font types */
  --font-family-header1: "Montserrat", sans-serif;
  --font-family-header2: "Montserrat", sans-serif;
  --font-family-desktopheader-activemenu: "Montserrat", sans-serif;
  --font-family-buttons-and-tabs: "Montserrat", sans-serif;
  --font-family-backbuttonlabel-desktop: "Montserrat", sans-serif;
  --font-family-inputfield-title: "Montserrat", sans-serif;
  --font-family-desktopheader-inactivemenu: "Montserrat", sans-serif;
  --font-family-emptystate-message: "Montserrat", sans-serif;
  --font-family-error-message: "Montserrat", sans-serif;
  --font-family-listing-information: "Open Sans", sans-serif;
  --font-family-body-text: "Open Sans", sans-serif;
  --font-family-input-field: "Open Sans", sans-serif;

  /* Font styles */
  --font-style-header1: normal;
  --font-style-header2: normal;
  --font-style-desktopheader-activemenu: normal;
  --font-style-buttons-and-tabs: normal;
  --font-style-backbuttonlabel-desktop: normal;
  --font-style-inputfield-title: normal;
  --font-style-desktopheader-inactivemenu: normal;
  --font-style-emptystate-message: normal;
  --font-style-error-message: italic;
  --font-style-listing-information: normal;
  --font-style-body-text: normal;
  --font-style-input-field: normal;

  /* Font weights */
  --font-weight-header1: 700;
  --font-weight-header2: 700;
  --font-weight-desktopheader-activemenu: 700;
  --font-weight-buttons-and-tabs: 700;
  --font-weight-backbuttonlabel-desktop: 600;
  --font-weight-inputfield-title: 600;
  --font-weight-desktopheader-inactivemenu: 500;
  --font-weight-emptystate-message: 500;
  --font-weight-error-message: 500;
  --font-weight-listing-information: 600;
  --font-weight-body-text: 400;
  --font-weight-input-field: 400;

  /* Font sizes for MOBILE */
  --font-size-header1: 18px;
  --font-size-header2: 14px;
  --font-size-desktopheader-activemenu: 18px;
  --font-size-buttons-and-tabs: 12px;
  --font-size-backbuttonlabel-desktop: 16px;
  --font-size-inputfield-title: 12px;
  --font-size-desktopheader-inactivemenu: 18px;
  --font-size-emptystate-message: 14px;
  --font-size-error-message: 12px;
  --font-size-listing-information: 12px;
  --font-size-body-text: 12px;
  --font-size-input-field: 12px;
}

@media screen and (min-width: 720px) {
  /* Font sizes overrule for DESKTOP */
  :root {
    --font-size-header1: 32px;
    --font-size-header2: 22px;
    --font-size-desktopheader-activemenu: 18px;
    --font-size-buttons-and-tabs: 18px;
    --font-size-backbuttonlabel-desktop: 16px;
    --font-size-inputfield-title: 14px;
    --font-size-desktopheader-inactivemenu: 18px;
    --font-size-emptystate-message: 18px;
    --font-size-error-message: 14px;
    --font-size-listing-information: 16px;
    --font-size-body-text: 18px;
    --font-size-input-field: 14px;
  }
}

body {
  font-family: var(--font-family-body-text);
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-element-background1);
}

html,
body,
#app {
  min-height: 100vh;
}

.content-container {
  width: 100%;
  margin-bottom: 50px; /* mobile first, for mobile bottom menu */
}
.content-container.backgroundVisible {
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  background-image: url("~@/assets/images/img_background@3x.png");
}

.page {
  max-width: var(--desktop-max-width);
  margin: 0 auto;
  padding: 0 var(--padding-large) var(--padding-large);
}

@media screen and (min-width: 720px) {
  /* desktop */
  .content-container {
    margin-bottom: 0;
  }
}
</style>
