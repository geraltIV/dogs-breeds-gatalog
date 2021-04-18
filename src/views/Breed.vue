<template>
  <div>
    <Navigation />

    <CardContainer
      :breed-name="this.currentBreedNmae"
      :breeds-list="getCurrentBreedImages"
      @getNewImages="scrollTrigger"
    />

    <Loader v-show="loading" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "../components/Navigation";
import CardContainer from "../components/CardContainer";

export default {
  name: "Breed",
  components: {
    Navigation,
    CardContainer,
  },
  data() {
    return {
      currentBreedNmae: "",
      loading: true,
      observer: null,
    };
  },
  async mounted() {
    this.currentBreedNmae = this.$route.path.replace(/\//g, "");
    await this.retrieveCurrentBreedPhotos(this.currentBreedNmae);
    this.loading = false;
  },
  beforeDestroy() {
    this.getCurrentBreedImages.length = 0;
  },
//   watch: {
//     $route (to, from){
//         this.currentBreedNmae = this.$route.path.replace(/\//g, "");
//     }
//   },
  computed: {
    ...mapGetters({
      getCurrentBreedImages: "getCurrentBreedImages",
    }),
  },
  methods: {
    ...mapActions({
      retrieveCurrentBreedPhotos: "retrieveCurrentBreedPhotos",
    }),
    scrollTrigger() {
      this.retrieveCurrentBreedPhotos(this.currentBreedNmae);
    },
  },
};
</script>

<style>
</style>