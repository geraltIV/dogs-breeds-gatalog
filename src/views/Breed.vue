<template>
  <div>
    <Navigation :current-breed="currentBreedName" />

    <CardContainer
      :breed-name="this.currentBreedName"
      :breeds-list="getCurrentBreedList.slice(0, loadlimit)"
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
      loadlimit: 20,
    };
  },
  async mounted() {
    this.currentBreedName = this.$route.path.replace(/\//g, "");
    await this.retrieveAllBreedPhotos(this.currentBreedName);
    this.loading = false;
  },
  beforeDestroy() {
    this.getCurrentBreedList.length = 0;
  },
  watch: {
    $route(to, from) {
      if (to != from) window.location.reload();
    },
  },
  computed: {
    ...mapGetters({
      getCurrentBreedList: "getCurrentBreedList",
    }),
  },
  methods: {
    ...mapActions({
      retrieveAllBreedPhotos: "retrieveAllBreedPhotos",
    }),
    retrieveNewImages() {
      this.loading = true;
      this.loadlimit += 20;
      this.loading = false;
    },
  },
};
</script>

<style>
</style>