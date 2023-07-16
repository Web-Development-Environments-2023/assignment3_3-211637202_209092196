<template>
  <div class="full-page-container">
    <b-card no-body class="full-page-card" :img-src="recipe.image" img-alt="Image" img-top>
      <b-card-body>
        <b-card-title>{{ recipe.title }}</b-card-title>
        <b-card-sub-title class="mb-2">Belong to: {{ recipe.belongTo }}</b-card-sub-title>
        <br />
        <b-card-sub-title class="mb-2">When to make: {{ recipe.whenToMake }}</b-card-sub-title>
        <br />
        <b-card-sub-title class="mb-2">Ready in: {{ recipe.readyInMinutes }} minutes</b-card-sub-title>
        <br />
        <div class="line"></div>
        <br />

        <b-card-text>
          <p>Popularity: {{ recipe.popularity }}</p>
          <p>Vegetarian: {{ isRecipeVegetarian(recipe) ? 'Yes' : 'No' }}</p>
          <p>Vegan: {{ isRecipeVegan(recipe) ? 'Yes' : 'No' }}</p>
          <p>Gluten-Free: {{ isRecipeGlutenFree(recipe) ? 'Yes' : 'No' }}</p>
        </b-card-text>
        <br />
        <div class="line"></div>
        <br />

        <b-list-group flush>
          <b-list-group-item>
            <p>Extended Ingredients:</p>
            <ul>
              <li v-for="(ingredient, index) in recipe.extendedIngredients.split('\n')" :key="index">
                {{ ingredient }}
              </li>
            </ul>
          </b-list-group-item>
          <br />
          <b-list-group-item>
            <p>Analyzed Instructions:</p>
            <ul>
              <li v-for="(instruction, index) in recipe.analyzedInstructions.split('\n')" :key="index">
                {{ instruction }}
              </li>
            </ul>
          </b-list-group-item>

          <br />
          <div class="line"></div>
          <br />

          <p>Servings: {{ recipe.servings }}</p>
        </b-list-group>
      </b-card-body>
      <b-button pill variant="outline-secondary" class="back-button" @click="goBack">Go Back</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  mounted() {
    this.fetchRecipeDetails();
  },
  methods: {
    goBack() {
      window.history.back();
    },
    async fetchRecipeDetails() {
      const title = this.$route.params.title;

      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          `${this.$root.store.server_domain}/users/familyrecipes/allInformations/${title}`
        );

        this.axios.defaults.withCredentials = false;
        this.recipe = response.data[0];
        console.log('Recipe details:', this.recipe); // Check the fetched data in the console
      } catch (error) {
        console.error(error);
      }
    },
    isRecipeVegetarian(recipe) {
      return recipe.vegetarian === '1';
    },
    isRecipeVegan(recipe) {
      return recipe.vegan === '1';
    },
    isRecipeGlutenFree(recipe) {
      return recipe.glutenFree === '1';
    },
  },
};
</script>

<style scoped>
.full-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.full-page-card {
  width: 100%;
  max-width: 50rem;
  flex: 1;
}
.line {
  width: 100%;
  height: 1px;
  background-color: black;
}
</style>
