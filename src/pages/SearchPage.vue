<template>
  <div>
    <h1 class="page-title">Search Recipes</h1>
    <b-form class="container" @submit.prevent="onSearch" @reset.prevent="onReset" style="max-width: 500px;">
      <b-form-group id="input-group-query" label-cols-sm="3" label="Query:" label-for="query">
        <b-form-input
          id="query"
          type="text"
          style="width: 400px;"
          v-model="$v.form.query.$model"
          :state="validateState('query')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.number.required">
          Query is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-number" label-cols-sm="3" label="Number:" label-for="number">
        <b-form-select
          id="number"
          style="width: 400px;"
          v-model.number="$v.form.number.$model"
          :state="validateState('number')"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </b-form-select>
        <b-form-invalid-feedback>
          Number of recipes is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-cuisine" label-cols-sm="3" label="Cuisine:" label-for="cuisine">
        <b-form-select id="cuisine" style="width: 400px;" :options="cuisines" v-model="selectedCuisine"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-diet" label-cols-sm="3" label="Diet:" label-for="diet">
        <b-form-select id="diet" style="width: 400px;" :options="diets" v-model="form.diet"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-intolerances" label-cols-sm="3" label="Intolerances:" label-for="intolerances">
        <b-form-select
          id="intolerances"
          style="width: 400px;"
          :options="intolerances"
          v-model="form.intolerance"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-sortBy" label-cols-sm="3" label="Sort by:" label-for="sortBy">
        <b-form-select id="sortBy" style="width: 400px;" :options="sortBy" v-model="form.sortBy"></b-form-select>
      </b-form-group>

      <b-button type="reset" variant="danger" style="margin-right: 4px;">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;
        margin-left: 125px;"
      >
        Search
      </b-button>
    </b-form>

    <br />
    <hr />

    <div v-if="recipes">
      <div v-if="recipes.length > 0" class="search-results">
        <b-container>
          <h2 class="page-title">Search Results:</h2>
          <b-col>
            <b-card no-body>
              <b-tabs pills card>
                <b-tab v-for="(recipe, index) in recipes" :key="recipe.id" :title="`${index + 1}. ${recipe.title}`">
                  <RecipePreview :recipe="recipe" />
                  <hr />
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-container>
        <br />
      </div>
      <div v-else>
        <h2 class="page-title">
          No Results
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from '../components/RecipePreview';
import cuisines from '../assets/cuisines';
import diets from '../assets/diets';
import intolerances from '../assets/intolerances';
import sortBy from '../assets/sortingOptions';
import { required, alpha } from 'vuelidate/lib/validators';

export default {
  name: 'Search',
  data() {
    return {
      form: {
        query: '',
        number: '5',
        cuisine: '',
        diet: null,
        intolerance: null,
        sortBy: null,
        submitError: undefined,
      },
      cuisines: [{ value: null, text: '', disabled: true }],
      diets: [{ value: null, text: '', disabled: true }],
      intolerances: [{ value: null, text: '', disabled: true }],
      sortBy: [{ value: null, text: '', disabled: true }],

      errors: [],
      recipes: null,
      validated: false,
    };
  },
  validations: {
    form: {
      query: {
        required,
      },
      number: {
        required,
      },
    },
  },
  components: {
    RecipePreview,
  },
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    this.sortBy.push(...sortBy);
    // console.log($v);

    const storedSearch = sessionStorage.getItem('lastSearch');
    if (storedSearch) {
      this.recipes = JSON.parse(storedSearch);
    }
  },
  computed: {
    selectedCuisine: {
      get() {
        return this.form.cuisine;
      },
      set(value) {
        this.form.cuisine = value;
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
        // const response = [
        //   {
        //     id: 102,
        //     title: 'Simple Macaroni and Cheese',
        //     image:
        //       'https://static01.nyt.com/images/2021/02/28/dining/ch-pasta-alla-vodka/merlin_145792752_fabec26c-908c-4f71-8c84-2b145849da43-superJumbo.jpg?quality=75&auto=webp',
        //     readyInMinutes: 45,
        //     popularity: 5987,
        //     vegetarian: false,
        //     vegan: false,
        //     glutenFree: false,
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
        //   },
        //   {
        //     id: 102,
        //     title: 'Simple Macaroni and Cheese',
        //     image:
        //       'https://static01.nyt.com/images/2021/02/28/dining/ch-pasta-alla-vodka/merlin_145792752_fabec26c-908c-4f71-8c84-2b145849da43-superJumbo.jpg?quality=75&auto=webp',
        //     readyInMinutes: 45,
        //     popularity: 5987,
        //     vegetarian: false,
        //     vegan: false,
        //     glutenFree: false,
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
        //   },
        // ];
        const response = await this.axios.get(
          `${this.$root.store.server_domain}/recipes/search/${this.form.query}/${this.form.number}`,
          {
            cuisine: this.form.cuisine,
            diet: this.form.diet,
            intolerance: this.form.intolerance,
            sortBy: this.form.sortBy,
          }
        );

        console.log(response);
        // const recipes = response;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);

        sessionStorage.setItem('lastSearch', JSON.stringify(this.recipes));
      } catch (err) {
        // console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Search();
    },
    onReset() {
      this.form = {
        query: '',
        number: '5',
        cuisine: '',
        diet: null,
        intolerance: null,
        sortBy: null,
        submitError: undefined,
      };

      // Reset the selected values in the b-form-select components
      this.cuisine = null;
      this.form.diet = null;
      this.form.intolerance = null;
      this.form.sortBy = null;

      this.$v.$reset(); // Reset the vuelidate validation state
    },
  },
};
</script>

<style scoped>
/* .container {
  max-width: max-content;
  width: 500px;
}

.search-results {
  max-width: 10000px;
} */
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
