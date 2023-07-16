<template>
  <div>
    <h1 class="page-title">❤️Family❤️ Recipes Page</h1>
    <div class="carousel-container">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="3000"
        controls
        indicators
        style="text-shadow: 1px 1px 2px #333333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <router-link v-for="(recipe, index) in recipes" :to="`/familyRecipes/${recipe.title}`" :key="index">
          <b-carousel-slide
            :caption="recipe.title"
            :text="`Time to prepare: ${recipe.readyInMinutes} minutes`"
            :img-src="recipe.image"
            class="carousel"
          ></b-carousel-slide>
        </router-link>
      </b-carousel>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetchRecipes();
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      recipes: [],
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(this.$root.store.server_domain + '/users/familyrecipes');
        this.axios.defaults.withCredentials = false;

        this.recipes = response.data;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.carousel-container {
  max-width: 1300px;
  margin: 0 auto;
  border-radius: 0.5rem;
  margin-top: -10px;
  box-shadow: 0 30px 200px rgba(0, 0, 0, 0.3);
  /* max-width: 46vw;
  max-height: 700vh; */
}
.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #ffc107, #ff4081);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
