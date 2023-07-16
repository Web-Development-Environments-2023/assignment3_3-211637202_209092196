<template>
  <div>
    <b-card no-body class="overflow-hidden" style="max-width:">
      <b-row no-gutters>
        <b-col md="6">
          <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
            <b-card-img :src="this.recipe.image" alt="Image" class="img" @click="addVisited"></b-card-img>
          </router-link>
        </b-col>
        <b-col md="6">
          <b-card-body :title="recipe.title">
            <br />
            <b-card-sub-title class="mb-2">Prepare time: {{ recipe.readyInMinutes }}</b-card-sub-title>
            <br />
            <b-card-text>
              <small v-if="this.recipe.vegetarian">
                vegetarian: yes
                <br />
              </small>
              <small v-else>
                vegeterian: no
                <br />
              </small>
              <small v-if="this.recipe.vegan">
                vegan: yes
                <br />
              </small>
              <small v-else>
                vegan: no
                <br />
              </small>
              <small v-if="this.recipe.glutenFree">
                gluten free: yes
                <br />
              </small>
              <small v-else>
                gluten free: no
                <br />
              </small>
            </b-card-text>
            <b-button
              v-if="!this.isVisited"
              v-b-tooltip.hover
              title="Press the photo and take a look at the recipe details :-)"
            >
              Hover Me
            </b-button>
            <b-button v-if="this.isVisited" v-b-tooltip.hover title="You already visited this recipe :->">
              Hover Me
            </b-button>
            <br />
            <br />
            <b-list-group v-if="$root.store.username" flush>
              <b-button v-if="!this.isFavorite" @click="addToFavorites" class="favButton">Add to Favorites</b-button>
              <b-button v-if="this.isFavorite" :disabled="this.isFavorite" class="favButton">
                Already added to favorites
              </b-button>
            </b-list-group>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'RecipePreview',
  mounted() {
    this.checkFavoriteStatus();
    this.checkVisitedStatus();
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
      isFavorite: false,
      isVisited: false,
    };
  },
  // check later if the recipe is visited and if it is favorite
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    // id: {
    //   type: Number,
    //   required: true,
    // },
    // title: {
    //   type: String,
    //   required: true,
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true,
    // },
    // image: {
    //   type: String,
    //   required: true,
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   },
    // },
    // vegetarian: {
    //   type: Boolean,
    //   required: false,
    // },
    // vegan: {
    //   type: Boolean,
    //   required: false,
    // },
    // glutenFree: {
    //   type: Boolean,
    //   required: false,
    // },
  },
  methods: {
    async checkFavoriteStatus() {
      console.log(this.recipe.id);
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(this.$root.store.server_domain + '/users/favorites');
        const favorites = response.data.map((recipe) => recipe.id);
        // Check if the recipe ID is in the user's favorites
        this.isFavorite = favorites.includes(this.recipe.id);
        this.axios.defaults.withCredentials = false;
      } catch (err) {
        console.log(err.response);
      }
    },
    async checkVisitedStatus() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(this.$root.store.server_domain + '/users/visited');
        const Visited = response.data.map((recipe) => recipe.id);
        this.isVisited = Visited.includes(this.recipe.id);
        console.log(Visited);
        this.axios.defaults.withCredentials = false;
      } catch (err) {
        console.log(err.response);
      }
    },
    async addVisited() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(this.$root.store.server_domain + '/users/visited', {
          recipeId: this.recipe.id,
        });
        this.axios.defaults.withCredentials = false;
        this.isVisited = true;
      } catch (err) {
        console.log(err.response);
      }
    },
    async addToFavorites() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(this.$root.store.server_domain + '/users/favorites', {
          recipeId: this.recipe.id,
        });
        this.axios.defaults.withCredentials = false;
        isFavorite = true;
      } catch (err) {
        console.log(err.response);
      }
    },
  },
};
</script>

<style scoped>
.img {
  height: 105%;
  object-fit: cover;
}

.overflow-hidden {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.b-card-body {
  max-height: none;
}

.overflow-hidden:hover {
  transform: translateY(-5px);
}

.favButton {
  color: rgb(0, 0, 0);
}
</style>
