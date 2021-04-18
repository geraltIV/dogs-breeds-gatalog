import Vue from "vue";
import Vuex from "vuex";
import endpoint from "../utils/axios";
// import { pullBreed } from "../utils/parseUrl";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allBreedsList: [],
    allBreeds: [],
    allCurrentBreedImagesList: [],
    allBreedsWithImages: [],
    randomImage: "",
  },
  mutations: {
    ALL_BREEDS_LIST(state, data) {
      state.allBreedsList = data;
    },
    ALL_BREEDS(state, data) {
      state.allBreeds = data;
    },
    INSERT_MORE_PHOTOS(state, data) {
      state.allBreeds = [...state.allBreeds, ...data];
    },
    BREEDS_WITH_IMAGES(state, data) {
      state.allBreedsWithImages.push(data);
    },
    RANDOM_IMAGE(state, data) {
      state.randomImage = data;
    },
    ALL_CURRENT_BREED_LIST(state, data) {
      state.allCurrentBreedImagesList = data;
    },
  },
  actions: {
    async retrieveAllBreedsList({ commit }) {
      await endpoint
        .get("/breeds/list/all")
        .then((response) => {
          commit("ALL_BREEDS_LIST", Object.keys(response.data.message));
        })
        .catch((error) => console.log(error));
    },
    async retrieveRandomBreedsList({ commit }) {
      await endpoint
        .get("/breeds/image/random/20")
        .then((response) => {
          commit(
            "ALL_BREEDS",
            response.data.message.map((item) => {
              let pathArr = item.split("/");
              return {
                image: item,
                breed: pathArr[pathArr.length - 2],
              };
            })
          );
        })
        .catch((error) => {
          throw error;
        });
    },
    async insertRandomBreedsList({ commit }) {
      return await endpoint.get("/breeds/image/random/20").then((response) => {
        commit(
          "INSERT_MORE_PHOTOS",
          response.data.message.map((item) => {
            let pathArr = item.split("/");
            return {
              image: item,
              breed: pathArr[pathArr.length - 2],
            };
          })
        );
      });
    },
    async retrieveRandomBreedsPhoto({ commit }, payload = "boxer") {
      await endpoint
        .get(`/breed/${payload}/images/random/1`)
        .then((response) => {
          commit("RANDOM_IMAGE", response);
        })
        .catch((error) => console.log(error));
    },
    async retrieveAllBreedPhotos({ commit }, breedName) {
      await endpoint
        .get(`breed/${breedName}/images`)
        .then((response) => {
          commit(
            "ALL_CURRENT_BREED_LIST",
            response.data.message.map((item) => {
              let pathArr = item.split("/");
              return {
                image: item,
                breed: pathArr[pathArr.length - 2],
              };
            })
          );
          return response.data.message;
        })
        .catch((error) => console.log(error));
    },
  },
  getters: {
    getAllBreeds: (state) => {
      return [...state.allBreeds].sort((a, b) => {
        if (a.breed > b.breed) return 1;
        if (a.breed < b.breed) return -1;
        return 0;
      });
    },
    getListOfAllBreeds: (state) => state.allBreedsList,
    getAllCurrentBreedImages: (state) => state.allCurrentBreedImagesList,
    getRandomImage: (state) => state.randomImage,
    getCurrentBreedList: (state) => state.currentBreedImagesList,
  },
});
