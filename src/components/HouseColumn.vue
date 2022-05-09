<template>
  <Popup @buttonClicked="popupButtonClicked" :options="this.popup" />
  <div
    class="house-column"
    :id="house.id"
    @click="houseColumnClicked(house.id)"
  >
    <div
      class="img"
      :style="{ 'background-image': this.imageURL }"
      :alt="house.location.street"
    />
    <div class="info">
      <div class="house-header">
        <h2 class="street">{{ house.location.street }}</h2>
        <div class="actions">
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
      <p class="price">{{ this.priceFormatted }}</p>
      <p class="zipcodecity">
        {{ house.location.zip + " " + house.location.city }}
      </p>
      <div class="specs">
        <span class="bedrooms">{{ house.rooms.bedrooms }}</span>
        <span class="bathrooms">{{ house.rooms.bathrooms }}</span>
        <span class="size">{{ this.sizeFormatted }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "./Popup.vue";
import priceFormatting from "../mixins/priceFormatting";
export default {
  data() {
    return {
      popup: {
        visible: false,
        headerText: "Delete listing",
        bodyText:
          "Are you sure you want to delete this listing?\nThis action cannot be undone.",
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
  props: {
    house: Object,
  },
  components: {
    Popup,
  },
  methods: {
    houseColumnClicked(id) {
      // go to 'House Details' page for this house
      this.$router.push({ name: "House Details", params: { id: id } });
    },
    editClicked(event) {
      // go to addedit page for this house with id as param

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
            // Go back to homepage after deleting
            this.$router.push({ name: "Houses" });
          }
          // hide popup and reset popup id
          this.popup.visible = false;
          this.popup.targetId = ""
          break;
        case "cancel":
          // hide popup and reset popup id
          this.popup.visible = false;
          this.popup.targetId = ""
          break;
      }
    },
  },
  computed: {
    imageURL() {
      let url = require("../assets/images/img_empty_houses@3x.png"); // init with default
      if (this.house.image) {
        url = this.house.image;
      }
      let returnString = "url(" + url + ")";
      return returnString;
    },
    priceFormatted() {
      // use mixin to format price
      return priceFormatting.methods.priceFormatting(this.house.price, "€");
    },
    sizeFormatted() {
      let returnString = "?"; //init string
      if (this.house.size) {
        returnString = this.house.size + " m²";
      }
      return returnString;
    },
  },
};
</script>

<style scoped>
.house-column {
  display: flex;
  flex-basis: row;
  flex-wrap: wrap;
  width: 100%;
  cursor: pointer;
  padding: var(--padding-large);
  background-color: var(--color-element-background2);
  border-radius: var(--border-radius-small);
  margin-top: var(--padding-large);
}
.img {
  border-radius: var(--border-radius-small);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  flex-basis: 25%;
  min-height: 120px;
}
.info {
  flex-basis: 75%;
  padding-left: var(--padding-large);
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
}
.house-header {
  flex-basis: 100%;
  display: flex;
  align-items: center;
}
.specs {
  margin-top: var(--font-size-buttons-and-tabs);
  flex-basis: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}
.specs span {
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-text-secondary);
  margin-right: var(--padding-medium);
  height: 100%;
  display: flex;
  align-items: center;
}

.specs span::before {
  content: "";
  margin-right: 9px;
  height: 100%;
}

.specs span::before,
.actions button {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 22px;
  height: 22px;
}

.street {
  display: inline-block;
  flex-grow: 1;
  font-family: var(--font-family-header2);
  font-style: var(--font-style-header2);
  font-weight: var(--font-weight-header2);
  font-size: var(--font-size-header2);
  color: var(--color-text-primary);
}

.price {
  flex-basis: 100%;
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-text-primary);
}

.zipcodecity {
  flex-basis: 100%;
  font-family: var(--font-family-body-text);
  font-style: var(--font-style-body-text);
  font-weight: var(--font-weight-body-text);
  font-size: var(--font-size-body-text);
  color: var(--color-element-tertiary2);
}

.bedrooms::before {
  background-image: url("~@/assets/images/ic_bed@3x.png");
}

.bathrooms::before {
  background-image: url("~@/assets/images/ic_bath@3x.png");
}

.size::before {
  background-image: url("~@/assets/images/ic_size@3x.png");
}
.actions button {
  cursor: pointer;
  background-color: transparent;
  margin-left: var(--padding-small);
}
.actions button:first-child {
  margin-left: unset;
}

.actions button.edit {
  background-image: url("~@/assets/images/ic_edit@3x.png");
}

.actions button.delete {
  background-image: url("~@/assets/images/ic_delete@3x.png");
}

.actions button.liked {
  background-image: url("~@/assets/images/ic_heart_filled@3x.png");
}
.actions button.notliked {
  background-image: url("~@/assets/images/ic_heart@3x.png");
}
</style>