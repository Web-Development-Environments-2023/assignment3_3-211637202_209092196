<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1> -->

    <b-row>
      <b-col>
        <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" />
      </b-col>
      <b-col>
        <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
        <!-- {{ !$root.store.username }} -->
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true,
          }"
          disabled
        ></RecipePreviewList>
      </b-col>
      <!-- <div style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);">
        Centeredasdasdad
      </div> -->
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList';
export default {
  name: 'MainPage',
  components: {
    RecipePreviewList,
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
