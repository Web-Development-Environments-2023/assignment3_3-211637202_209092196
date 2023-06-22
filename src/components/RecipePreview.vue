<template>
  <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
    <div>
      <b-card no-body style="max-width: 20rem;" :img-src="this.recipe.image" img-alt="Image" img-top>
        <template #header>
          <h4 class="mb-0">{{ recipe.title }}</h4>
        </template>

        <b-card-body>
          <b-card-sub-title class="mb-2">Prepare time: {{ recipe.readyInMinutes }}</b-card-sub-title>
          <b-card-text>
            <small v-if="this.recipe.vegetarian">
              vegetarian: yes
            </small>
            <small v-else>
              vegeterian: no
            </small>
            <small v-if="this.recipe.vegan">
              vegan: yes
            </small>
            <small v-else>
              vegan: no
            </small>
            <small v-if="this.recipe.glutenFree">
              gluten free: yes
            </small>
            <small v-else>
              gluten free: no
            </small>
          </b-card-text>
        </b-card-body>

        <b-list-group flush>
          <b-list-group-item>visited</b-list-group-item>
          <b-list-group-item>favorite</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </router-link>
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
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
