<template>
  <div class="carousel-container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <router-link :to="`/familyRecipes/hi`" class="carousel-link">
        <b-carousel-slide
          img-width="50"
          img-height="480"
          caption="Hamburger"
          text="By grandomther"
          img-src="https://static01.nyt.com/images/2021/02/28/dining/ch-pasta-alla-vodka/merlin_145792752_fabec26c-908c-4f71-8c84-2b145849da43-superJumbo.jpg?quality=75&auto=webp"
        ></b-carousel-slide>
      </router-link>

      <router-link :to="`/familyRecipes/hi`" class="carousel-link">
        <b-carousel-slide
          img-width="50"
          img-height="480"
          caption="Hamburger"
          text="By grandomther"
          img-src="https://static01.nyt.com/images/2021/02/28/dining/ch-pasta-alla-vodka/merlin_145792752_fabec26c-908c-4f71-8c84-2b145849da43-superJumbo.jpg?quality=75&auto=webp"
        ></b-carousel-slide>
      </router-link>

      <router-link :to="`/familyRecipes/hi`" class="carousel-link">
        <b-carousel-slide
          img-width="50"
          img-height="480"
          caption="Hamburger"
          text="By grandomther"
          img-src="https://static01.nyt.com/images/2021/02/28/dining/ch-pasta-alla-vodka/merlin_145792752_fabec26c-908c-4f71-8c84-2b145849da43-superJumbo.jpg?quality=75&auto=webp"
        ></b-carousel-slide>
      </router-link>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Keep Smiling
        </p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    isRecipeVegetarian(recipe) {
      return recipe.vegetarian === 'true';
    },
    isRecipeVegan(recipe) {
      return recipe.vegan === 'true';
    },
    isRecipeGlutenFree(recipe) {
      return recipe.glutenFree === 'true';
    },
  },
};
</script>

<style scoped>
.carousel-container {
  max-width: 1300px;
  margin: 0 auto;
  border-radius: 0.5rem;
  margin-top: 50px;
  box-shadow: 0 30px 200px rgba(0, 0, 0, 0.3);
}
</style>
