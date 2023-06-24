<template>
  <b-container>
    <h3 v-if="title !== 'Favorites'" class="recipe-title">{{ title }}</h3>
    <div>
      <RecipePreview v-for="r in recipes" :key="r.id" :recipe="r" style="margin-bottom: 50px;" />
    </div>
    <button v-if="title === 'Random Recipes'" @click="updateRecipes" class="b1">Update Recipes</button>
  </b-container>
</template>

<script>
import RecipePreview from './RecipePreview.vue';
export default {
  name: 'RecipePreviewList',
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    if (this.title === 'Random Recipes') {
      this.updateRecipes();
    }
    if (this.title === 'Favorites') {
      this.showFavorites();
    }
    if (this.title === 'Last Viewed') {
      this.showViewed();
    }
  },
  methods: {
    async showFavorites() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          this.$root.store.server_domain + '/users/favorites'
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        this.axios.defaults.withCredentials = false;
        // console.log(response);
        // const recipes = response.data.recipes;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
      ////////
      // try {
      //   const recipes = [
      //     {
      //       id: 663150,
      //       title:
      //         'Thai Savory Brown Fried Rice hwwiuf hseih fois hfoi js rjg iudkh osdngo isn glsjnlureg fiksjerb ksd k sdbk dbkj',
      //       readyInMinutes: 45,
      //       image:
      //         'https://img.delicious.com.au/Jd9w68oz/w759-h506-cfill/del/2022/10/p70-classic-angus-beef-burger-with-pickle-burger-sauce-176387-1.png',
      //       popularity: 9,
      //       vegan: true,
      //       vegetarian: true,
      //       glutenFree: true,
      //     },
      //     {
      //       id: 640318,
      //       title: 'Crab Salad Stuffed Pita Pockets',
      //       readyInMinutes: 25,
      //       image:
      //         'https://img.delicious.com.au/YTJdoHED/w759-h506-cfill/del/2022/10/p70-salt-and-pepper-calamari-with-confit-garlic-aioli-176388-1.png',
      //       popularity: 8,
      //       vegan: false,
      //       vegetarian: false,
      //       glutenFree: false,
      //     },
      //   ];

      //   this.recipes = [...recipes];
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + '/recipes/random'
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        // console.log(response);
        // const recipes = response.data.recipes;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
      ///////////
      // try {
      //   const recipes = [
      //     {
      //       id: 715494,
      //       title:
      //         'Thai Savory Brown Fried Rice hwwiuf hseih fois hfoi js rjg iudkh osdngo isn glsjnlureg fiksjerb ksd k sdbk dbkj',
      //       readyInMinutes: 45,
      //       image:
      //         'https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200',
      //       popularity: 9,
      //       vegan: true,
      //       vegetarian: true,
      //       glutenFree: true,
      //     },
      //     {
      //       id: 640318,
      //       title: 'Crab Salad Stuffed Pita Pockets',
      //       readyInMinutes: 25,
      //       image:
      //         'https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-superJumbo.jpg?quality=75&auto=webp',
      //       popularity: 8,
      //       vegan: false,
      //       vegetarian: false,
      //       glutenFree: false,
      //     },
      //     {
      //       id: 636732,
      //       title: 'Cajun Lobster Pasta',
      //       readyInMinutes: 45,
      //       image:
      //         'https://static01.nyt.com/images/2021/02/28/dining/ch-pasta-alla-vodka/merlin_145792752_fabec26c-908c-4f71-8c84-2b145849da43-superJumbo.jpg?quality=75&auto=webp',
      //       popularity: 2,
      //       vegan: false,
      //       vegetarian: false,
      //       glutenFree: true,
      //     },
      //   ];

      //   this.recipes = [...recipes];
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async showViewed() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          this.$root.store.server_domain + '/users/visited'
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        this.axios.defaults.withCredentials = false;
        // console.log(response);
        // const recipes = response.data.recipes;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
      ////////
      // try {
      //   const recipes = [
      //     {
      //       id: 663150,
      //       title:
      //         'Thai Savory Brown Fried Rice hwwiuf hseih fois hfoi js rjg iudkh osdngo isn glsjnlureg fiksjerb ksd k sdbk dbkj',
      //       readyInMinutes: 45,
      //       image:
      //         'https://img.delicious.com.au/Jd9w68oz/w759-h506-cfill/del/2022/10/p70-classic-angus-beef-burger-with-pickle-burger-sauce-176387-1.png',
      //       popularity: 9,
      //       vegan: true,
      //       vegetarian: true,
      //       glutenFree: true,
      //     },
      //     // {
      //     //   id: 640318,
      //     //   title: 'Crab Salad Stuffed Pita Pockets',
      //     //   readyInMinutes: 25,
      //     //   image:
      //     //     'https://img.delicious.com.au/YTJdoHED/w759-h506-cfill/del/2022/10/p70-salt-and-pepper-calamari-with-confit-garlic-aioli-176388-1.png',
      //     //   popularity: 8,
      //     //   vegan: false,
      //     //   vegetarian: false,
      //     //   glutenFree: false,
      //     // },
      //   ];

      //   this.recipes = [...recipes];
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.recipe-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 30px;
  margin-top: 20px;
  position: relative;
  display: inline-block;
  animation: glowing 5s infinite;
  margin-left: 0px;
  transform: translateX(270px);
}

@keyframes glowing {
  0% {
    text-shadow: 0 0 5px rgb(25, 25, 59);
  }
  50% {
    text-shadow: 0 0 20px rgb(34, 34, 62);
  }
  100% {
    text-shadow: 0 0 5px rgb(24, 24, 24);
  }
}
.b1 {
  background-color: #f44336;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 330px;
}
</style>
