<template>
  <div class="breeds-list-container">
    <button class="button all-breeds-button">Все пёсели</button>
    <ul class="breeds-list">
      <li
        v-for="breed in breedsList"
        :key="breed.id"
        @click="goToBreedPage(breed)"
      >
        {{ breed | nameFilter(breed) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BreedList",
  props: {
    breedsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    goToBreedPage(breed) {
      this.$emit('hideList')
      this.$router.push({ name: "Breed", params: { breed: `${breed.replace(/\//g, '-')}` } });
    }
  }
};
</script>

<style>
</style>