<template>
  <div class="home">
    <Navigation @sort="sortListOfBreeds('name')" />
    <CardContainer :breeds-list="getAllBreeds" @getNewImages="appendMoreImages" />
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
      isOrdered: false
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
    list () {
      return this.isOrdered ? this.getAllBreeds : this.$store.state.dogList
    }
  },
  methods: {
    ...mapActions({
      retrieveRandomBreedsList: "retrieveRandomBreedsList",
      insertRandomBreedsList: 'insertRandomBreedsList'
    }),
    sortBreedsList() {
      this.isOrdered = !this.isOrdered
    },
    appendMoreImages() {
      this.insertRandomBreedsList()
    }
  },
};
</script>
