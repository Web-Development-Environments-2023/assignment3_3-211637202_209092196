<template>
  <div>
    <h1 class="page-title">Favorite recipes</h1>
    <RecipePreviewList
      title="Favorites"
      :class="{
        center: true,
      }"
      disabled
    ></RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList';

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
    };
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
  background: linear-gradient(45deg, #8a732d, #bb0542);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
