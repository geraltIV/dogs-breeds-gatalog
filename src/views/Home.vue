<template>
  <div class="home">
    <Navigation @sort="sortListOfBreeds('name')" />
    <CardContainer :breeds-list="getAllBreeds" />
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
      currentSortDir: "asc",
      modifier: 1
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
    }),
  },
  methods: {
    ...mapActions({
      retrieveRandomBreedsList: "retrieveRandomBreedsList",
    }),
    sortListOfBreeds(s) {
      
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }

      this.currentSort = s;

      this.getAllBreeds.sort((a,b) => {
        return a - b;
      });
    },
  },
};
</script>
