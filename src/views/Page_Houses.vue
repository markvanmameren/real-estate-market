<template>
  <div class="page houses">
    <div class="houses-options">
      <Searchbar
        :placeholder="searchbarPlaceHolder"
        @textChanged="searchTextChanged"
      />
      <Sorter
        :sortOptions="this.sortOptions"
        :sortDirection="this.sortDirection"
        @sortOptionSelected="commitSortHouses"
      />
    </div>
    <div class="houses-container">
      <p class="searchCount" v-if="this.searchTerm && this.housesCount > 0">
        {{ this.housesCount + " results found" }}
      </p>
      <HouseColumn
        v-for="house in this.houses"
        :key="house.id"
        :house="house"
      />
      <NoResults v-if="this.housesCount == 0" :msg="this.noResultsMsg" />
    </div>
  </div>
</template>

<script>
import HouseColumn from "../components/HouseColumn.vue";
import Searchbar from "../components/Searchbar.vue";
import Sorter from "../components/Sorter.vue";
import NoResults from "../components/NoResults.vue";
export default {
  components: {
    Searchbar,
    Sorter,
    HouseColumn,
    NoResults,
  },
  data() {
    return {
      searchbarPlaceHolder: "Search houses",
    };
  },
  mounted() {
    this.$store.commit("showHeaderButton");
    this.$store.commit("hideBackgroundImage");
    this.$store.commit("hideBackButton");
    this.$store.commit("showPageTitle");
  },
  computed: {
    houses() {
      return this.$store.getters.getHouses;
    },
    housesCount() {
      return this.$store.getters.getHousesCount;
    },
    searchTerm() {
      return this.$store.getters.getSearchTerm;
    },
    sortOptions() {
      return this.$store.getters.getSortOptions;
    },
    sortDirection() {
      return this.$store.getters.getSortDirection;
    },
    noResultsMsg() {
      // the to results message depends on the content of searchTerm
      if (this.searchTerm) {
        return "No houses found.\nPlease try another keyword.";
      } else {
        return "No houses found.";
      }
    },
  },
  methods: {
    commitSortHouses(sortType) {
      this.$store.commit("sortHouses", sortType);
    },
    searchTextChanged(newSearchTerm) {
      this.$store.commit("setSearchTerm", newSearchTerm);
    },
  },
};
</script>

<style scoped>
.houses-options {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.searchCount {
  margin-top: var(--padding-large);
  font-family: var(--font-family-header2);
  font-style: var(--font-style-header2);
  font-weight: var(--font-weight-header2);
  font-size: var(--font-size-header2);
  color: var(--color-text-primary);
}
</style>