<template>
  <div>
    <Navigation />

    <CardContainer
      :breed-name="this.currentBreedName"
      :breeds-list="getCurrentBreedList"
      @getNewImages="retrieveNewImages"
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
      currentBreedName: "",
      loading: true,
      observer: null,
    };
  },
  async mounted() {
    this.currentBreedName = this.$route.path.replace(/\//g, "");
    await this.getAllCurrentBreedImages(this.currentBreedName);
    this.loading = false;
  },
  beforeDestroy() {
    this.getAllCurrentBreedImages.length = 0;
  },
  watch: {
    $route(to, from) {
      if(to != from) window.location.reload();
    }
  },
  computed: {
    ...mapGetters({
      getAllCurrentBreedImages: "getAllCurrentBreedImages",
      getCurrentBreedList: 'getCurrentBreedList'
    }),
  },
  methods: {
    ...mapActions({
      retrieveAllBreedPhotos: 'retrieveAllBreedPhotos'
    }),
    retrieveNewImages() {
      // this.getAllCurrentBreedImages(this.currentBreedName);
    },
  },
};
</script>

<style>
</style>