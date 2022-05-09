<template>
  <div class="topbar">
    <header class="header">
      <router-link to="/" class="logo-link">
        <div class="logo" />
      </router-link>
      <Menu>
        <!-- passing the router-links via 'links' slot -->
        <template v-slot:links>
          <router-link class="menu-link" to="/">
            <i class="houses" />
            <span class="linktitle">Houses</span>
          </router-link>
          <router-link class="menu-link" to="/listings">
            <i class="listings" />
            <span class="linktitle">Listings</span>
          </router-link>
          <router-link class="menu-link" to="/favorites">
            <i class="favorites" />
            <span class="linktitle">Favorites</span>
          </router-link>
          <router-link class="menu-link" to="/history">
            <i class="history" />
            <span class="linktitle">History</span>
          </router-link>
          <router-link class="menu-link" to="/about">
            <i class="about" />
            <span class="linktitle">About</span>
          </router-link>
        </template>
      </Menu>
    </header>
  </div>
  <div class="pageheader">
    <router-link
      v-if="prevPage.name && $store.getters.getBackButtonVisible"
      class="backlink"
      :to="prevPage.path"
    >
      <button class="backbutton">
        <span class="backbuttonText">Back to {{ prevPage.name }} page</span>
      </button>
    </router-link>
    <h1 v-if="$store.getters.getPageTitleVisible" class="pagetitle">
      {{ currentRouteName }}
    </h1>
    <AddButton :content="$store.getters.getHeaderButtonData" />
  </div>
</template>

<script>
import Menu from "./Menu.vue"
import AddButton from "./AddButton.vue"
export default {
  components: {
    Menu,
    AddButton,
  },
  computed: {
    currentRouteName() {
      // if we're viewing the addedit page for an existing house
      if (this.$route.name == "Create new listing" && this.$route.params && this.$route.params.id) {
        return "Edit listing" // Change page name
      }
      return this.$route.name
    },
    prevPage() {
      return this.$store.getters.getPreviousPage
    },
  },
}
</script>

<style>
/* not scoped because of slots */
.topbar {
  width: 100%;
  background-color: var(--color-element-background2);
}
.header,
.pageheader {
  max-width: var(--desktop-max-width);
  margin: 0 auto;
}
.pageheader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding: var(--padding-large); /* mobile first */
}
.backlink {
  position: absolute;
  left: var(--padding-large);
  text-decoration: none;
  color: var(--color-font-primary);
  padding-bottom: var(--padding-large);
}
.backbutton {
  display: flex;
  cursor: pointer;
  align-items: center;
  background-color: transparent;
  font-family: var(--font-family-backbuttonlabel-desktop);
  font-style: var(--font-style-backbuttonlabel-desktop);
  font-weight: var(--font-weight-backbuttonlabel-desktop);
  font-size: var(--font-size-backbuttonlabel-desktop);
}
.backbuttonText {
  display: none; /* mobile first */
}

.backbutton::before {
  content: "";
  height: 22px;
  width: 22px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("~@/assets/images/ic_back_white@3x.png"); /* mobile first */
  margin-right: var(--padding-small);
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.logo-link {
  flex-grow: 1;
  padding: var(--padding-small);
  padding-left: 0;
  display: none; /* mobile first */
  visibility: hidden; /* mobie first */
}
.logo {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/img_logo_dtt@3x.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
}

.menu-link {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-link i {
  display: inline-block;
  height: 22px;
  width: 22px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.menu-link i.houses {
  background-image: url("../assets/images/ic_mobile_navigarion_home@3x.png");
}
.menu-link.router-link-active i.houses {
  background-image: url("../assets/images/ic_mobile_navigarion_home_active@3x.png");
}
.menu-link i.listings {
  background-image: url("../assets/images/ic_mobile_navigarion_listings@3x.png");
}
.menu-link.router-link-active i.listings {
  background-image: url("../assets/images/ic_mobile_navigarion_listings_active@3x.png");
}
.menu-link i.favorites {
  background-image: url("../assets/images/ic_mobile_navigarion_favorites@3x.png");
}
.menu-link.router-link-active i.favorites {
  background-image: url("../assets/images/ic_mobile_navigarion_favorites_active@3x.png");
}
.menu-link i.history {
  background-image: url("../assets/images/ic_mobile_navigarion_history@3x.png");
}
.menu-link.router-link-active i.history {
  background-image: url("../assets/images/ic_mobile_navigarion_history_active@3x.png");
}
.menu-link i.about {
  background-image: url("../assets/images/ic_mobile_navigarion_info@3x.png");
}
.menu-link.router-link-active i.about {
  background-image: url("../assets/images/ic_mobile_navigarion_info_active@3x.png");
}

.pagetitle {
  flex-grow: 1;
  text-align: center;
  color: var(--color-text-primary);
  font-size: var(--font-size-header1);
  font-family: var(--font-family-header1);
  font-weight: var(--font-weight-header1);
}
@media screen and (min-width: 720px) {
  /* desktop */
  .header {
    padding: 0 var(--padding-large);
  }
  .pagetitle {
    transform: unset;
    text-align: left;
  }
  .logo-link {
    display: block; /* mobile first */
    visibility: visible; /* mobie first */
  }
  .backlink {
    position: relative;
    flex-basis: 100%;
    left: unset;
  }
  .backbuttonText {
    display: inline;
  }
  .backbutton::before {
    background-image: url("~@/assets/images/ic_back_grey@3x.png");
  }
}
</style>