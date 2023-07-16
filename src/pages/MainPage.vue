<template>
  <div class="container">
    <b-row class="row-with-spacing">
      <b-col>
        <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
      </b-col>
      <!-- <div class="center-line"></div>
      <b-col class="right-col">
        <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
      </b-col> -->
      <div class="center-line"></div>
      <b-col class="right-col">
        <router-link v-if="!$root.store.username" to="/login" tag="button" class="login">
          You need to Login to vue this
        </router-link>
        <RecipePreviewList
          title="Last Viewed"
          :class="{
            // RandomRecipes: true,
            blur: !$root.store.username,
            center: true,
          }"
          disabled
        ></RecipePreviewList>
      </b-col>
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
.container {
  max-width: 2500px; /* Adjust the max-width as needed */
  margin: 0 auto;
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

// .row-with-spacing {
//   display: flex;
//   justify-content: center;
// }
.login {
  position: relative;
  top: 20px;
  right: -320px;
  margin-bottom: 20px;

  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  text-decoration: none;
  cursor: pointer;
}
.center-line {
  width: 3px;
  background-color: #0920004e;
  margin: 0 20px; /* Adjust the margin as needed */
}
</style>
