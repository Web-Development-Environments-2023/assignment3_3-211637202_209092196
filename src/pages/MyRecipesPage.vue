<template>
  <div class="container">
    <h1 class="page-title">My Recipes Page</h1>
    <div class="row">
      <div class="col-md-4" v-for="recipe in recipes" :key="recipe.title">
        <div class="card">
          <router-link :to="`/myRecipes/${recipe.title}`" class="card-link">
            <img :src="recipe.image" class="card-img-top" alt="Recipe Image" />
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">Ready in: {{ recipe.readyInMinutes }} minutes</p>
            <p class="card-text">Popularity: {{ recipe.popularity }}</p>
            <p class="card-text">Vegetarian: {{ isRecipeVegetarian(recipe) ? 'Yes' : 'No' }}</p>
            <p class="card-text">Vegan: {{ isRecipeVegan(recipe) ? 'Yes' : 'No' }}</p>
            <p class="card-text">Gluten-Free: {{ isRecipeGlutenFree(recipe) ? 'Yes' : 'No' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    isRecipeVegetarian(recipe) {
      return recipe.vegetarian === 'true';
    },
    isRecipeVegan(recipe) {
      return recipe.vegan === 'true';
    },
    isRecipeGlutenFree(recipe) {
      return recipe.glutenFree === 'true';
    },
    async fetchRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(this.$root.store.server_domain + '/users/myrecipes');
        console.log(localStorage.getItem('username'));
        this.axios.defaults.withCredentials = false;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log('Recipe data:', this.recipes);
      } catch (error) {
        console.error(error);
      }
      console.log(this.recipes);
    },
  },
};
</script>

<style scoped>
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

.row {
  margin-left: -150px;
  margin-right: -150px;
}

.col-md-4 {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  border-radius: 10px;
  max-height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-text {
  margin-bottom: 0.5rem;
}
</style>
