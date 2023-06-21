<template>
  <div>
    <RecipePreview></RecipePreview>
  </div>
</template>

<script>
import RecipePreview from './components/RecipePreview.vue';
export default (await import('vue')).defineComponent({
  name: 'RandomRecipes',
  components: {
    RecipePreview,
  },
});
</script>

<style></style>
