<template>
  <div class="page detail">
    <Popup @buttonClicked="popupButtonClicked" :options="this.popup" />
    <div class="main">
      <div class="img" :style="{ 'background-image': this.imageURL }" />
      <div class="actions mobile">
        <button
          @click.stop="editClicked"
          :id="house.id"
          class="edit"
          v-if="house.madeByMe"
        />
        <button
          @click.stop="deleteClicked"
          :id="house.id"
          class="delete"
          v-if="house.madeByMe"
        />
        <button
          @click.stop="likeClicked"
          :id="house.id"
          :class="house.liked ? 'liked' : 'notliked'"
        />
      </div>
      <div class="house-container">
        <div class="house-header">
          <h2 class="street">{{ house.location.street }}</h2>
          <div class="actions desktop">
            <button
              @click.stop="editClicked"
              :id="house.id"
              class="edit"
              v-if="house.madeByMe"
            />
            <button
              @click.stop="deleteClicked"
              :id="house.id"
              class="delete"
              v-if="house.madeByMe"
            />
            <button
              @click.stop="likeClicked"
              :id="house.id"
              :class="house.liked ? 'liked' : 'notliked'"
            />
          </div>
        </div>
        <p class="zipcodecity">
          {{ house.location.zip + " " + house.location.city }}
        </p>
        <div class="specs">
          <span class="price">{{ this.priceFormatted }}</span>
          <span class="size">{{ house.size }}</span>
          <span class="contructionYear">{{
            "Built in " + house.constructionYear
          }}</span>
        </div>
        <div class="specs">
          <span class="bedrooms">{{ house.rooms.bedrooms }}</span>
          <span class="bathrooms">{{ house.rooms.bathrooms }}</span>
          <span class="hasGarage">{{ house.hasGarage ? "Yes" : "No" }}</span>
        </div>
        <p class="description">{{ house.description }}</p>
      </div>
    </div>
    <div class="sidebar">
      <div class="recommended">
        <h1 class="recommendedTitle">Recommended for you</h1>
        <HouseColumn
          v-for="house in this.recommmendedHouses"
          :key="house.id"
          :house="house"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HouseColumn from "../components/HouseColumn.vue";
import Popup from "../components/Popup.vue";
import priceFormatting from "../mixins/priceFormatting";
export default {
  components: {
    HouseColumn,
    Popup,
  },
  data() {
    return {
      emptyHouse: {
        id: "",
        image: "",
        price: "",
        rooms: {
          bathrooms: "",
          bedrooms: "",
        },
        size: "",
        description: "",
        createdAt: "",
        location: {
          city: "",
          street: "",
          zip: "",
        },
        constructionYear: "",
        hasGarage: false,
        madeByMe: false,
      },
      popup: {
        visible: false,
        headerText: "Delete listing",
        bodyText:
          "Are you sure you want to delete this listing?\nThis action cannot be undone.",
        targetId: "test",
        buttons: [
          {
            text: "Yes, delete",
            value: "delete",
            accent: true,
          },
          {
            text: "Go back",
            value: "cancel",
            accent: false,
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.commit("hideHeaderButton");
    this.$store.commit("hideBackgroundImage");
    this.$store.commit("showBackButton");
    this.$store.commit("hidePageTitle");
  },
  methods: {
    editClicked(event) {
      // go to edit page
      this.$router.push({
        name: "Create new listing",
        params: { id: event.target.id },
      });
    },
    deleteClicked(event) {
      // show delete confirmation popup
      this.popup.targetId = event.target.id;
      this.popup.visible = true;
    },
    likeClicked(event) {
      // like house in store
      this.$store.commit("likeHouseWithId", event.target.id);
    },
    popupButtonClicked(value) {
      // confirmation popup for when delete is first clicked
      switch (value) {
        case "delete":
          if (this.popup.targetId) {
            this.$store.dispatch(
              "deleteHouseFromApiWithId",
              this.popup.targetId
            );
            this.$router.push({ name: "Houses" }); // Go back to homepage after deleting
          }
          // hide popup and reset popup id
          this.popup.visible = false;
          this.popup.targetId = "";
          break;
        case "cancel":
          // hide popup and reset popup id
          this.popup.visible = false;
          this.popup.targetId = "";
          break;
      }
    },
  },
  computed: {
    houseId() {
      return this.$route.params.id;
    },
    house() {
      // get house from store by id
      let house = this.$store.getters.getHouseById(this.houseId);
      // if house is empty, show emptyHouse from local data
      if (Object.keys(house).length == 0) {
        house = this.emptyHouse;
      }
      return house;
    },
    priceFormatted() {
      // use mixin to format price
      return priceFormatting.methods.priceFormatting(this.house.price);
    },
    recommmendedHouses() {
      // get 3 recommended houses for this house
      return this.$store.getters.getRecommendedHousesForHouseId( this.houseId, 3 );
    },
    imageURL() {
      // init with default
      let url = require("../assets/images/img_empty_houses@3x.png");
      // if image url exists on house object
      if (this.house.image) {
        // set url to house object image
        url = this.house.image;
      }
      // format CSS style
      let returnString = "url(" + url + ")";
      return returnString;
    },
  },
};
</script>

<style scoped>
.page.detail {
  padding: 0; /* mobile first */
}
.actions.mobile {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: var(--padding-large); /* mobile first */
  display: block; /* mobile first */
  visibility: visible; /* mobile first */
}
.actions.desktop {
  display: none; /* mobile first */
  visibility: none; /* mobile first */
}
.actions button {
  content: "";
  cursor: pointer;
  background-color: transparent;
  margin-left: var(--padding-small);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 22px;
  width: 22px;
}

.actions.desktop button.edit {
  background-image: url("~@/assets/images/ic_edit@3x.png");
}
.actions.mobile button.edit {
  background-image: url("~@/assets/images/ic_edit_white@3x.png");
}
.actions.desktop button.delete {
  background-image: url("~@/assets/images/ic_delete@3x.png");
}
.actions.mobile button.delete {
  background-image: url("~@/assets/images/ic_delete_white@3x.png");
}

.actions button.liked {
  background-image: url("~@/assets/images/ic_heart_filled@3x.png");
}
.actions button.notliked {
  background-image: url("~@/assets/images/ic_heart@3x.png");
}
.img {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 170px;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.house-container {
  width: 100%;
  padding: var(--padding-large);
  background-color: var(--color-element-background2);
  border-radius: var(--border-radius-large) var(--border-radius-large) 0 0;
  margin-top: 100px;
}

.house-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: top;
  justify-content: space-between;
}

.main {
  padding-bottom: var(--padding-large);
}

.street,
.recommendedTitle {
  font-family: var(--font-family-header2);
  font-style: var(--font-style-header2);
  font-weight: var(--font-weight-header2);
  font-size: var(--font-size-header2);
  color: var(--color-text-primary);
  margin-bottom: var(--padding-small);
}

.specs {
  margin: var(--padding-medium) 0;
  display: flex;
  flex-basis: row;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
}
.zipcodecity,
.specs span {
  display: flex;
  align-items: center;
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-text-secondary);
  margin-right: var(--padding-medium);
  height: 100%;
}

.zipcodecity::before,
.specs span::before {
  content: "";
  margin-right: 9px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: var(--font-size-body-text);
  width: var(--font-size-body-text);
}

.price {
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-text-secondary);
}

.description {
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-text-secondary);
  line-height: 1.5em;
}

.zipcodecity::before {
  background-image: url("~@/assets/images/ic_location@3x.png");
}

.price::before {
  background-image: url("~@/assets/images/ic_price@3x.png");
}

.size::before {
  background-image: url("~@/assets/images/ic_size@3x.png");
}

.contructionYear::before {
  background-image: url("~@/assets/images/ic_construction_date@3x.png");
}

.bedrooms::before {
  background-image: url("~@/assets/images/ic_bed@3x.png");
}

.bathrooms::before {
  background-image: url("~@/assets/images/ic_bath@3x.png");
}

.hasGarage::before {
  background-image: url("~@/assets/images/ic_garage@3x.png");
}

.recommended {
  padding: 0 var(--padding-large) var(--padding-large);
}

.recommended > div {
  box-shadow: 0 0 10px 0 var(--color-shadow);
}

@media screen and (min-width: 720px) {
  /* desktop */
  .page.detail {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: top;
    justify-content: space-between;
    padding: 0 var(--padding-large) var(--padding-large);
  }
  .main {
    flex-basis: 40%;
    flex-grow: 1;
  }
  .sidebar {
    flex-basis: 400px;
    flex-grow: 1;
  }
  .actions.mobile {
    display: none;
    visibility: hidden;
  }
  .actions.desktop {
    display: inline-block;
    visibility: visible;
  }
  .img {
    height: 40vh;
    position: relative;
    background-size: cover;
    background-position: center center;
  }
  .house-container {
    margin-top: 0;
    border-radius: 0;
  }
  .recommended {
    margin-left: 3vw;
    padding: 0;
  }
}
</style>