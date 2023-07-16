<template>
  <div>
    <b-button @click="openModal" class="button">Make a Recipe</b-button>

    <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Recipe" hide-footer>
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group id="input-group-title" label-cols-sm="3" label="Title:" label-for="title">
          <b-form-input
            id="title"
            v-model="$v.form.title.$model"
            type="text"
            :state="validateState('title')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.title.required">
            Title is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-image" label-cols-sm="3" label="Image-URL:" label-for="image">
          <b-form-input
            id="image"
            v-model="$v.form.image.$model"
            type="text"
            :state="validateState('image')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.image.required">
            image is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-mins" label-cols-sm="3" label="Prepare time in mins:" label-for="readyInMinutes">
          <label for="range-1">Choose a number</label>
          <b-form-input id="range-1" v-model="form.readyInMinutes" type="range" min="0" max="300"></b-form-input>
          <div class="mt-2">Value: {{ form.readyInMinutes }}</div>
        </b-form-group>

        <b-form-group id="input-group-popularity" label-cols-sm="3" label="Popularity:" label-for="popularity">
          <label for="demo-sb">Choose popularity</label>
          <b-form-spinbutton id="demo-sb" v-model="form.popularity" min="1" max="10000"></b-form-spinbutton>
          <p>Value: {{ form.popularity }}</p>
        </b-form-group>

        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="form.selected"
            :options="form.options"
            :aria-describedby="ariaDescribedby"
            switches
          ></b-form-checkbox-group>
        </b-form-group>

        <b-form-group
          id="input-group-extendedIngredients"
          label-cols-sm="3"
          label="Ingredients:"
          label-for="extendedIngredients"
        >
          <b-form-textarea
            id="extendedIngredients"
            v-model="$v.form.extendedIngredients.$model"
            :state="validateState('extendedIngredients')"
          ></b-form-textarea>
          <b-form-invalid-feedback v-if="!$v.form.extendedIngredients.required">
            Ingredients is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-analyzedInstructions"
          label-cols-sm="3"
          label="Instructions:"
          label-for="analyzedInstructions"
        >
          <b-form-textarea
            id="analyzedInstructions"
            v-model="$v.form.analyzedInstructions.$model"
            :state="validateState('analyzedInstructions')"
          ></b-form-textarea>
          <b-form-invalid-feedback v-if="!$v.form.analyzedInstructions.required">
            Instructions is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-servings" label-cols-sm="3" label="Servings:" label-for="servings">
          <label for="demo-sb">Choose serving numbers</label>
          <b-form-spinbutton id="demo-sb" v-model="form.servings" min="1" max="100"></b-form-spinbutton>
          <p>Value: {{ form.servings }}</p>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Submit</b-button>
      </b-form>
      <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
        Submitting failed: {{ form.submitError }}
      </b-alert>
    </b-modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'MakeRecipes',
  data() {
    return {
      form: {
        title: '',
        image: '',
        readyInMinutes: null,
        popularity: null,
        selected: [],
        options: [
          { text: 'vegeterian', value: 'vegeterian' },
          { text: 'vegan', value: 'vegan' },
          { text: 'glutenFree', value: 'glutenFree' },
        ],
        extendedIngredients: '',
        analyzedInstructions: '',
        servings: null,
        submitError: undefined,
      },
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      image: {
        required,
      },
      extendedIngredients: {
        required,
      },
      analyzedInstructions: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Submit() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(this.$root.store.server_domain + '/users/create', {
          title: this.form.title,
          image: this.form.image,
          readyInMinutes: this.form.readyInMinutes,
          popularity: this.form.popularity,
          vegetarian: this.form.selected.includes('vegeterian'),
          vegan: this.form.selected.includes('vegan'),
          glutenFree: this.form.selected.includes('glutenFree'),
          extendedIngredients: this.form.extendedIngredients,
          analyzedInstructions: this.form.analyzedInstructions,
          servings: this.form.servings,
        });
        this.axios.defaults.withCredentials = false;
        this.$refs.modal.hide();
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSubmit() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Submit();
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    onReset() {
      this.form = {
        title: '',
        image: '',
        readyInMinutes: null,
        popularity: null,
        selected: [],
        options: [
          { text: 'vegeterian', value: 'vegeterian' },
          { text: 'vegan', value: 'vegan' },
          { text: 'glutenFree', value: 'glutenFree' },
        ],
        extendedIngredients: '',
        analyzedInstructions: '',
        servings: null,
      };
    },
    openModal() {
      this.$refs.modal.show();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
