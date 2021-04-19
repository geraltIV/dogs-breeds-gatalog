<template>
  <div>
    <div class="favourites" v-if="getFavouritesDogs.length">
      <CardContainer :breeds-list="getFavouritesDogs" />
    </div>
    <p v-else>Вы пока что не добавили любимых песелей</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardContainer from "../components/CardContainer";
export default {
  name: "Favourites",
  components: {
    CardContainer,
  },
  computed: {
    ...mapGetters({
      getFavouritesDogs: "getFavouritesDogs",
    }),
  },
};
</script>

<style>
</style>