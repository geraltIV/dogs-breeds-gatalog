<template>
  <div class="home">
    <Navigation @sort="sortBreedsList" />
    <CardContainer
      :breeds-list="getBreedsList"
      @getNewImages="appendMoreImages"
    />
    <Loader v-show="loading" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "../components/Navigation";
import CardContainer from "../components/CardContainer";

export default {
  name: "Home",
  components: {
    Navigation,
    CardContainer,
  },
  data() {
    return {
      loading: true,
      isOrdered: false,
      currentSortDir: "asc",
    };
  },
  async mounted() {
    await this.retrieveRandomBreedsList();
    this.loading = false;
  },
  beforeDestroy() {
    this.getAllBreeds.length = 0;
  },
  computed: {
    ...mapGetters({
      getAllBreeds: "getAllBreeds",
      sortedDogList: "sortedDogList",
    }),
    getBreedsList() {
      return this.isOrdered ? this.sortedDogList : this.$store.state.allBreeds;
    },
  },
  methods: {
    ...mapActions({
      retrieveRandomBreedsList: "retrieveRandomBreedsList",
      insertRandomBreedsList: "insertRandomBreedsList",
    }),
    appendMoreImages() {
      this.insertRandomBreedsList();
    },
    sortBreedsList() {
      this.isOrdered = !this.isOrdered;
    },
  },
};
</script>
