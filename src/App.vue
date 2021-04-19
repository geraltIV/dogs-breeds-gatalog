<template>
  <div id="app">
    <Header />

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      isScrolled: false,
    };
  },
  beforeCreate() {
    this.$store.commit("INIT_LIKED_BREEDS");
  },
};
</script>

<style lang="scss">
@import "./assets/scss/index.scss";
</style>
