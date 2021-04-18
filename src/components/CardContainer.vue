<template>
  <div>
    <div class="card-container">
      <Card
        v-for="item of breedsList"
        :key="item.id"
        :breed="breedName"
        :image-url="item"
      />
    </div>

    <div ref="infinitescrolltrigger" class="observer"></div>

    <Loader v-show="loading" />
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "CardContainer",
  components: {
    Card,
  },
  data() {
    return {
      loading: true,
    };
  },
  props: {
    breedsList: {
      type: Array,
      default() {
        return [];
      },
    },
    breedName: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.loading = false;
    this.scrollTrigger();
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.$emit("getNewImages");
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },
  },
};
</script>

<style>

</style>