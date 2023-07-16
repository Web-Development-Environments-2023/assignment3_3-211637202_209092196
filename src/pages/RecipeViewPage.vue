<template>
  <div class="full-page-container">
    <b-card no-body class="full-page-card" :img-src="recipe.image" img-alt="Image" img-top>
      <b-card-body>
        <b-card-title>{{ recipe.title }}</b-card-title>
        <b-card-sub-title class="mb-2">Ready in: {{ recipe.readyInMinutes }} minutes</b-card-sub-title>
        <br />
        <div class="line"></div>
        <br />

        <b-card-text>
          <p>Popularity: {{ recipe.popularity }}</p>
          <div v-if="this.recipe.vegetarian">
            vegetarian: yes
            <br />
          </div>
          <div v-else>
            vegeterian: no
            <br />
          </div>
          <div v-if="this.recipe.vegan">
            vegan: yes
            <br />
          </div>
          <div v-else>
            vegan: no
            <br />
          </div>
          <div v-if="this.recipe.glutenFree">
            gluten free: yes
            <br />
          </div>
          <div v-else>
            gluten free: no
            <br />
          </div>
        </b-card-text>
        <br />
        <div class="line"></div>
        <br />

        <b-list-group flush>
          <b-list-group-item>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
                style="font-family: 'Courier New', Courier, monospace; color: rgba(0, 0, 0, 0.918);"
              >
                {{ r.original }}
              </li>
            </ul>
          </b-list-group-item>
          <br />
          <b-list-group-item>
            Instructions:
            <ol style="font-family: 'Courier New', Courier, monospace; color: rgba(1, 0, 8, 0.897);">
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
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
  async created() {
    // try {
    //   let response = {
    //     id: 102,
    //     title: 'Simple Macaroni and Cheese',
    //     image:
    //       'https://static01.nyt.com/images/2021/02/28/dining/ch-pasta-alla-vodka/merlin_145792752_fabec26c-908c-4f71-8c84-2b145849da43-superJumbo.jpg?quality=75&auto=webp',
    //     readyInMinutes: 45,
    //     popularity: 5987,
    //     vegetarian: false,
    //     vegan: true,
    //     glutenFree: false,
    //     extendedIngredients: [
    //       {
    //         id: 11124,
    //         aisle: 'Produce',
    //         image: 'sliced-carrot.png',
    //         consistency: 'SOLID',
    //         name: 'carrot',
    //         nameClean: 'carrot',
    //         original: '½ cup diced carrot',
    //         originalName: 'diced carrot',
    //         amount: 0.5,
    //         unit: 'cup',
    //         meta: ['diced'],
    //         measures: {
    //           us: {
    //             amount: 0.5,
    //             unitShort: 'cups',
    //             unitLong: 'cups',
    //           },
    //           metric: {
    //             amount: 118.294,
    //             unitShort: 'ml',
    //             unitLong: 'milliliters',
    //           },
    //         },
    //       },
    //     ],
    //     analyzedInstructions: [
    //       {
    //         name: '',
    //         steps: [
    //           {
    //             number: 1,
    //             step:
    //               'Deep fry shallot till golden brown, drain oil and set aside.  Retain the oil for later use.Wash rice and add oil.',
    //             ingredients: [
    //               {
    //                 id: 11677,
    //                 name: 'shallot',
    //                 localizedName: 'shallot',
    //                 image: 'shallots.jpg',
    //               },
    //               {
    //                 id: 20444,
    //                 name: 'rice',
    //                 localizedName: 'rice',
    //                 image: 'uncooked-white-rice.png',
    //               },
    //               {
    //                 id: 4582,
    //                 name: 'cooking oil',
    //                 localizedName: 'cooking oil',
    //                 image: 'vegetable-oil.jpg',
    //               },
    //             ],
    //             equipment: [],
    //           },
    //         ],
    //       },
    //     ],
    //     servings: 10,
    //   };

    try {
      const id = this.$route.params.recipeId;
      const response = await this.axios.get(`${this.$root.store.server_domain}/recipes/allInformations/${id}`);

      if (response.status !== 200) this.$router.replace('/NotFound');

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
      } = response.data;

      // let {
      //   analyzedInstructions,
      //   instructions,
      //   extendedIngredients,
      //   popularity,
      //   readyInMinutes,
      //   image,
      //   title,
      //   vegetarian,
      //   vegan,
      //   glutenFree,
      //   servings,
      // } = response;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log('error.response.status', error.response.status);
      this.$router.replace('/NotFound');
      return;
    }
  },
  methods: {
    goBack() {
      window.history.back();
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
