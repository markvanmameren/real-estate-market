<template>
  <div class="page addedit">
    <Popup @buttonClicked="popupButtonClicked" :options="this.popup" />
    <div class="actions mobile">
      <button @click.stop="deleteClicked" class="delete" v-if="this.houseId" />
    </div>
    <form @submit.prevent="submitButtonPressed" class="form-container">
      <div class="form-group">
        <label for="streetName" class="required">Street name</label>
        <input
          :class="{ errorField: !streetIsValid && triedSubmitting }"
          name="streetName"
          v-model="house.streetName"
          type="text"
          placeholder="Enter the streetname"
        />
      </div>
      <div class="form-group half">
        <label for="houseNumber" class="required">House number</label>
        <input
          :class="{ errorField: !houseNumberIsValid && triedSubmitting }"
          name="houseNumber"
          v-model.number="house.houseNumber"
          placeholder="Enter house number"
        />
      </div>
      <div class="form-group half">
        <label for="numberAddition" class="optional">Addition</label>
        <input
          :class="{ errorField: !numberAdditionIsValid && triedSubmitting }"
          name="numberAddition"
          v-model="house.numberAddition"
          type="text"
          placeholder="e.g. A"
        />
      </div>
      <div class="form-group">
        <label for="zip" class="required">Postal code</label>
        <input
          :class="{ errorField: !zipIsValid && triedSubmitting }"
          name="zip"
          v-model="house.zip"
          type="text"
          placeholder="e.g. 1000 AA"
        />
      </div>
      <div class="form-group">
        <label for="city" class="required">City</label>
        <input
          :class="{ errorField: !cityIsValid && triedSubmitting }"
          name="city"
          v-model="house.city"
          type="text"
          placeholder="e.g. Utrecht"
        />
      </div>
      <div class="form-group">
        <label for="upload-container" class="required"
          >Upload picture (PNG or JPG)</label
        >
        <div class="upload-container">
          <label
            class="upload-field"
            :class="{ errorField: !imageIsValid && triedSubmitting }"
          >
            <input
              :disabled="imageIsValid"
              v-if="!this.imageFile"
              @change="imageSelected"
              accept="image/png, image/jpeg"
              name="fileupload"
              type="file"
            />
            <div
              class="imagePreview"
              v-if="this.imageUrl"
              :style="{ 'background-image': 'url(' + this.imageUrl + ')' }"
            />
          </label>
          <button
            class="deleteImageButton"
            @click.stop="deleteImage"
            v-if="imageIsValid"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="price" class="required">Price</label>
        <input
          :class="{ errorField: !priceIsValid && triedSubmitting }"
          name="price"
          v-model.number="house.price"
          type="number"
          placeholder="e.g. € 150.000"
        />
      </div>
      <div class="form-group half">
        <label for="size" class="required">Size</label>
        <input
          :class="{ errorField: !sizeIsValid && triedSubmitting }"
          name="size"
          v-model.number="house.size"
          type="number"
          placeholder="e.g. 60m²"
        />
      </div>
      <div class="form-group half">
        <label for="hasGarage" class="required">Garage</label>
        <select
          :class="{ errorField: !hasGarageIsValid && triedSubmitting }"
          required
          name="hasGarage"
          v-model="house.hasGarage"
        >
          <option class="placeholder" value="" disabled selected hidden>
            Select
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div class="form-group half">
        <label for="bedrooms" class="required">Bedrooms</label>
        <input
          :class="{ errorField: !bedroomsIsValid && triedSubmitting }"
          name="bedrooms"
          v-model.number="house.bedrooms"
          type="number"
          placeholder="Enter amount"
        />
      </div>
      <div class="form-group half">
        <label for="bathrooms" class="required">Bathrooms</label>
        <input
          :class="{ errorField: !bathroomsIsValid && triedSubmitting }"
          name="bathrooms"
          v-model.number="house.bathrooms"
          type="number"
          placeholder="Enter amount"
        />
      </div>
      <div class="form-group">
        <label for="constructionYear" class="required">Construction year</label>
        <input
          :class="{ errorField: !constructionYearIsValid && triedSubmitting }"
          name="constructionYear"
          v-model.number="house.constructionYear"
          type="number"
          placeholder="e.g. 1990"
        />
      </div>
      <div class="form-group">
        <label for="description" class="required">Description</label>
        <textarea
          :class="{ errorField: !descriptionIsValid && triedSubmitting }"
          name="description"
          v-model="house.description"
          placeholder="Enter description"
        />
      </div>
      <div class="form-group">
        <label v-if="!formIsValid && triedSubmitting" class="errorForm"
          >Required field missing or incorrect.</label
        >
      </div>
      <div class="form-group">
        <button class="submit">{{ this.houseId ? "UPDATE" : "POST" }}</button>
      </div>
    </form>
    <div class="actions desktop">
      <button @click.stop="deleteClicked" class="delete" v-if="this.houseId">
        DELETE
      </button>
    </div>
  </div>
</template>

<script>
import Popup from "../components/Popup.vue";
export default {
  components: {
    Popup,
  },
  mounted() {
    this.$store.commit("hideHeaderButton");
    this.$store.commit("showBackgroundImage");
    this.$store.commit("showBackButton");
    this.$store.commit("showPageTitle");

    if (this.houseId) {
      // If the user is editting an existing house, fill in all fields
      let existingHouse = this.$store.getters.getHouseById(this.houseId);
      if (existingHouse) {
        // matching existing house fields to this.house
        if (existingHouse.location) {
          if (existingHouse.location.street) {
            // since street is a combined string with street, number and addition, we need to split the string on the number
            let streetString = String(existingHouse.location.street);
            let splitStreetArray = streetString.split(/(\d+)/);

            // The first part of the string is the street name
            if (splitStreetArray[0]) {
              let streetName = splitStreetArray[0].trim();
              this.house.streetName = streetName;
            }
            // The middle part of the string is the house number
            if (splitStreetArray[1]) {
              let houseNumber = splitStreetArray[1].trim();
              this.house.houseNumber = houseNumber;
            }
            // The last part of the string is the number addition
            if (splitStreetArray[2]) {
              let numberAddition = splitStreetArray[2].trim();
              this.house.numberAddition = numberAddition;
            }
          }
          if (existingHouse.location.zip) {
            this.house.zip = existingHouse.location.zip;
          }
          if (existingHouse.location.city) {
            this.house.city = existingHouse.location.city;
          }
        }
        if (existingHouse.price) {
          this.house.price = existingHouse.price;
        }
        if (existingHouse.size) {
          this.house.size = existingHouse.size;
        }
        if (String(existingHouse.hasGarage) == "true" || String(existingHouse.hasGarage) == "false") {
          this.house.hasGarage = existingHouse.hasGarage;
        }
        if (existingHouse.rooms) {
          if (existingHouse.rooms.bedrooms) {
            this.house.bedrooms = existingHouse.rooms.bedrooms;
          }
          if (existingHouse.rooms.bathrooms) {
            this.house.bathrooms = existingHouse.rooms.bathrooms;
          }
        }
        if (existingHouse.constructionYear) {
          this.house.constructionYear = existingHouse.constructionYear;
        }
        if (existingHouse.description) {
          this.house.description = existingHouse.description;
        }
        if (existingHouse.image) {
          this.imageUrl = existingHouse.image;
        }
      }
    }
  },
  computed: {
    houseId() {
      return this.$route.params.id;
    },
    streetIsValid() {
      return !!this.house.streetName;
    },
    houseNumberIsValid() {
      return !!this.house.houseNumber;
    },
    numberAdditionIsValid() {
      return typeof this.house.numberAddition === "string";
    },
    zipIsValid() {
      return !!this.house.zip;
    },
    cityIsValid() {
      return !!this.house.city;
    },
    imageIsValid() {
      return this.imageUrl != "";
    },
    priceIsValid() {
      return typeof this.house.price === "number" && this.house.price > 0;
    },
    sizeIsValid() {
      return typeof this.house.size === "number" && this.house.size > 0;
    },
    hasGarageIsValid() {
      return (
        String(this.house.hasGarage) == "true" ||
        String(this.house.hasGarage) == "false"
      );
    },
    bedroomsIsValid() {
      return typeof this.house.bedrooms === "number";
    },
    bathroomsIsValid() {
      return typeof this.house.bathrooms === "number";
    },
    constructionYearIsValid() {
      return (
        typeof this.house.constructionYear === "number" &&
        this.house.constructionYear > 1500 &&
        this.house.constructionYear < 2500
      );
    },
    descriptionIsValid() {
      return !!this.house.description;
    },
    formIsValid() {
      return (
        this.streetIsValid &&
        this.houseNumberIsValid &&
        this.zipIsValid &&
        this.cityIsValid &&
        this.imageIsValid &&
        this.priceIsValid &&
        this.sizeIsValid &&
        this.hasGarageIsValid &&
        this.bedroomsIsValid &&
        this.bathroomsIsValid &&
        this.constructionYearIsValid &&
        this.descriptionIsValid
      );
    },
  },
  methods: {
    imageSelected(event) {
      // get image
      let newImage = event.target.files[0];
      if (newImage) {
        // store image in local variable
        this.imageFile = newImage;
        // store image URL as well
        this.imageUrl = URL.createObjectURL(this.imageFile);
      }
    },
    deleteImage() {
      this.imageFile = null;
      this.imageUrl = "";
    },
    deleteClicked() {
      // show delete confirmation popup
      this.popup.targetId = this.id;
      this.popup.visible = true;
    },
    popupButtonClicked(value) {
      // confirmation popup for when delete is first clicked
      switch (value) {
        case "delete":
          if (this.houseId) {
            this.popup.targetId = this.houseId;
            // delete house from API
            this.$store.dispatch("deleteHouseFromApiWithId", this.houseId);
            // Go back to homepage after deleting
            this.$router.push({ name: "Houses" });
          }
          // hide popup
          this.popup.visible = false;
          break;
        case "cancel":
          // hide popup
          this.popup.visible = false;
          break;
      }
    },
    clearAllFields() {
      this.imageFile = null;
      this.house.streetName = "";
      this.house.houseNumber = "";
      this.house.numberAddition = "";
      this.house.zip = "";
      this.house.city = "";
      this.house.price = "";
      this.house.size = "";
      this.house.hasGarage = "";
      this.house.bedrooms = "";
      this.house.bathrooms = "";
      this.house.constructionYear = "";
      this.house.description = "";
      this.triedSubmitting = false;
    },
    submitButtonPressed() {
      this.triedSubmitting = true;
      if (this.formIsValid) {
        if (this.houseId) {
          // If editting an existing house
          // create object to send with edit house action
          let objectToDispatch = {
            houseId: this.houseId,
            updatedHouse: this.house,
            newImageFile: this.imageFile,
          };
          // edit house on API
          this.$store.dispatch("editHouseOnApi", objectToDispatch);
          this.clearAllFields();
        } else {
          // If creating a new house
          // create object to send with edit house action
          let objectToDispatch = {
            newHouse: this.house,
            newImageFile: this.imageFile,
          };
          // add house to API
          this.$store.dispatch("addNewHouseToApi", objectToDispatch);
          this.clearAllFields();
        }
      }
    },
  },
  data() {
    return {
      triedSubmitting: false,
      imageFile: null,
      imageUrl: "",
      house: {
        streetName: "",
        houseNumber: "",
        numberAddition: "",
        zip: "",
        city: "",
        price: "",
        size: "",
        hasGarage: "",
        bedrooms: "",
        bathrooms: "",
        constructionYear: "",
        description: "",
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
};
</script>

<style scoped>
.form-container,
.actions.desktop {
  max-width: 450px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.required::after {
  content: "*";
}
.optional::after {
  content: " (optional)";
}
.form-group {
  flex-basis: 100%;
  padding: var(--padding-small) 0 0 0;
  display: flex;
  flex-direction: column;
}
.form-group.half {
  flex-basis: 50%;
}
.form-group.half:nth-child(2n) {
  padding: var(--padding-small) var(--padding-small) 0 0;
}

label {
  color: var(--color-text-primary);
  font-family: var(--font-family-input-field);
  font-style: var(--font-style-input-field);
  font-weight: var(--font-weight-input-field);
  font-size: var(--font-size-input-field);
  padding: var(--padding-small) 0;
}

input,
select,
textarea {
  color: var(--color-text-primary);
  font-family: var(--font-family-input-field);
  font-style: var(--font-style-input-field);
  font-weight: var(--font-weight-input-field);
  font-size: var(--font-size-input-field);
  flex-grow: 1;
  padding: var(--padding-small);
  background-color: var(--color-element-background2);
  border: 2px solid var(--color-element-background2);
  border-radius: var(--border-radius-small);
}

input::placeholder,
select:invalid,
textarea::placeholder {
  color: var(--color-element-tertiary2);
}

.upload-container {
  vertical-align: top;
}

.upload-field {
  display: inline-block;
  border: 2px dashed var(--color-element-tertiary2);
  background-color: none;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("~@/assets/images/ic_plus_grey@3x.png");
  background-size: 22px 22px;
  border-radius: var(--border-radius-small);
  cursor: pointer;
  z-index: 1;
  padding: 0;
  height: 120px;
  width: 120px;
  overflow: hidden;
}
.upload-field input[type="file"] {
  height: 100%;
  width: 100%;
  display: none;
}
.deleteImageButton {
  position: absolute;
  border-radius: 999px; /* circle */
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("~@/assets/images/ic_clear_white@3x.png");
  z-index: 3;
  width: 33px;
  height: 33px;
  margin-left: -24px;
  margin-top: -8px;
  cursor: pointer;
}
.imagePreview {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: auto;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.errorField {
  border-color: var(--color-element-primary);
}

.errorForm {
  color: var(--color-element-primary);
  font-family: var(--font-family-error-message);
  font-style: var(--font-style-error-message);
  font-weight: var(--font-weight-error-message);
  font-size: var(--font-size-error-message);
}

.submit {
  margin: var(--padding-small) 0;
  font-size: var(--font-size-inputfield-title);
  font-family: var(--font-family-inputfield-title);
  font-weight: var(--font-weight-inputfield-title);
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s linear;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: var(--border-radius-small);
  background-color: var(--color-element-primary);
  color: var(--color-element-background2);
  padding: var(--padding-small) var(--padding-large);
}
.submit:hover,
.submit:active {
  background-color: var(--color-element-secondary);
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
  cursor: pointer;
  background-color: transparent;
}
.actions.mobile button {
  content: "";
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: var(--padding-small);
  height: 22px;
  width: 22px;
}
.actions.mobile button {
  margin-left: var(--padding-large);
}
.actions.desktop button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--padding-small) 0;
  font-size: var(--font-size-inputfield-title);
  font-family: var(--font-family-inputfield-title);
  font-weight: var(--font-weight-inputfield-title);
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s linear;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: var(--border-radius-small);
  background-color: var(--color-element-secondary);
  color: var(--color-element-background2);
  padding: var(--padding-small) var(--padding-large);
}
.actions.desktop button:hover,
.actions.desktop button:active {
  background-color: var(--color-element-tertiary1);
  color: var(--color-text-secondary);
}

.actions.mobile button.delete {
  background-image: url("~@/assets/images/ic_delete@3x.png");
}

@media screen and (min-width: 720px) {
  /* desktop */
  .actions.mobile {
    display: none;
    visibility: hidden;
  }
  .actions.desktop {
    display: block;
    visibility: visible;
  }
}
</style>