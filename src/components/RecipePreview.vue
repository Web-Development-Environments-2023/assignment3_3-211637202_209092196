<template>
  <div>
    <b-card no-body class="overflow-hidden" style="max-width: 800px;">
      <b-row no-gutters>
        <b-col md="6">
          <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
            <b-card-img :src="this.recipe.image" alt="Image" class="img"></b-card-img>
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
            <b-list-group flush>
              <b-list-group-item>visited</b-list-group-item>
              <br />
              <b-list-group-item>favorite</b-list-group-item>
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
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    readyInMinutes: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    aggregateLikes: {
      type: Number,
      required: false,
      default() {
        return undefined;
      },
    },
    vegetarian: {
      type: Boolean,
      required: false,
    },
    vegan: {
      type: Boolean,
      required: false,
    },
    glutenFree: {
      type: Boolean,
      required: false,
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
}

.b-card-body {
  max-height: none;
}
</style>
