import Vue from "vue";
import Vuex from "vuex";
import endpoint from "../utils/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allBreedsList: [],
    allBreeds: [],
    currentBreedImagesList: [],
    allBreedsWithImages: [],
    randomImage: ''
  },
  mutations: {
    ALL_BREEDS_LIST(state, data) {
      state.allBreedsList = data;
    },
    ALL_BREEDS(state, data) {
      // const listOfAllBreeds = []

      // for (const element in data) {
      //   if (data[element].length) {
      //     data[element].forEach(item => {
      //       listOfAllBreeds.push(`${element}/${item}`)
      //     })
      //   } else {
      //     listOfAllBreeds.push(element)
      //   }
      // }

      state.allBreeds = data;
    },
    BREEDS_WITH_IMAGES(state, data) {
      state.allBreedsWithImages.push(data);
    },
    RANDOM_IMAGE(state, data) {
      state.randomImage = data;
    },
    CURRENT_BREED_LIST(state, data) {
      data.forEach(item => state.currentBreedImagesList.push(item))
    }
  },
  actions: {
    async retrieveAllBreedsList({commit}) {
      await endpoint.get('breeds/list')
        .then(response => {
          commit('ALL_BREEDS_LIST', response.data.message)
        })
        .catch((error) => console.log(error));
    },
    async retrieveRandomBreedsList({ commit, dispatch, getters }) {
      await endpoint
        .get("breeds/list/random/20")
        .then((response) => {
          commit("ALL_BREEDS", response.data.message)
          
          response.data.message.forEach(item => {
            dispatch('retrieveRandomBreedsPhoto', item)
            commit('BREEDS_WITH_IMAGES', {
              name: item,
              image: getters.getRandomImage,
              isFavourite: false
            })
          })
        })
        .catch((error) => console.log(error));
    },
    async retrieveRandomBreedsPhoto({commit}, payload = 'boxer') {
      await endpoint.get(`/breed/${payload}/images/random/1`)
        .then(response => {
          commit('RANDOM_IMAGE', response)
        })
        .catch((error) => console.log(error));
    },
    async retrieveCurrentBreedPhotos({commit}, breedName) {
      await endpoint.get(`breed/${breedName}/images/random/20`)
        .then(response => {
          commit('CURRENT_BREED_LIST', response.data.message)
        })
        .catch((error) => console.log(error));
    }
  },
  getters: {
    getAllBreeds: state => state.allBreeds,
    getListOfAllBreeds: state => state.allBreedsList,
    getCurrentBreedImages: state => state.currentBreedImagesList,
    getRandomImage: state => state.randomImage
  },
});
