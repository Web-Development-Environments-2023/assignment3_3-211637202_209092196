<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
        <!-- addLogo -->

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" class="c1">
              <router-link :to="{ name: 'main' }">Main</router-link>
            </b-nav-item>
            <b-nav-item href="#" class="c1">
              <router-link :to="{ name: 'search' }">Search</router-link>
            </b-nav-item>
            <b-nav-item href="#" class="c1">
              <router-link :to="{ name: 'about' }">About</router-link>
            </b-nav-item>
            <b-nav-item href="#" class="c2">
              <span v-if="$root.store.username">
                <b-nav-item-dropdown text="Personal" variant="primary">
                  <b-dropdown-item @click.stop="navigateTo('favorites')" class="c3">Favorites</b-dropdown-item>
                  <b-dropdown-item @click.stop="navigateTo('myRecipes')" class="c3">My Recipes</b-dropdown-item>
                  <b-dropdown-item @click.stop="navigateTo('familyRecipes')" class="c3">Family Recipes</b-dropdown-item>
                </b-nav-item-dropdown>
              </span>
            </b-nav-item>
            <b-nav-item href="#">
              <span v-if="$root.store.username">
                <b-nav-item href="#">
                  <MakeRecipeModal>
                    <b-button @click.stop="$emit('open-modal')" class="button"></b-button>
                  </MakeRecipeModal>
                </b-nav-item>
              </span>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <span v-if="!$root.store.username">
              <b-nav-item-dropdown text="Hello Guest" right class="c2">
                <b-dropdown-item @click.stop="navigateTo('login')" class="c3">Login</b-dropdown-item>
                <b-dropdown-item @click.stop="navigateTo('register')" class="c3">Register</b-dropdown-item>
              </b-nav-item-dropdown>
            </span>

            <span v-if="$root.store.username">
              <b-nav-item-dropdown right class="c2">
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>{{ $root.store.username }}</em>
                </template>
                <b-dropdown-item href="#">
                  <b-dropdown-item @click.stop="Logout" class="c3">Log Out</b-dropdown-item>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </span>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import MakeRecipeModal from './components/MakeRecipeModal.vue';
export default {
  name: 'App',
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast('Logout', 'User logged out successfully', 'success');

      this.$router.push('/').catch(() => {
        this.$forceUpdate();
      });
    },
    openModal() {
      this.$refs.modal.show();
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  components: {
    MakeRecipeModal,
  },
};
</script>

<style lang="scss">
@import '@/scss/form-style.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

// #nav {
//   padding: 0px;
//   height: 100px;
//   color: #00000000;
// }

#nav .navbar {
  display: flex;
  align-items: center;
  height: 45px;
}

#nav .c1 {
  // align-content: center;
  // align-items: center;
  font-size: 20px;
  margin-top: 10px;
  color: #ffffff;
  font-weight: bold;
  margin-left: 4px;
}

#nav .c2 {
  margin-top: 3px;
  font-weight: bold;
  font-size: large;
}

#nav .button {
  font-size: 16px;
  background-color: #00000000;
  border-color: #16181800;
  // margin: 0;
  margin-left: -20px;
  margin-top: -2px;
  font-weight: bold;
}

#nav a {
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav .c2 .dropdown-menu {
  border: 2px solid #000000;
  margin-top: 10px;
}

#nav .c3 a {
  padding: 0.5rem 1.2rem;
  color: #34453b;
  font-weight: bold;
}

#nav .c3 {
  position: relative;
}

#nav .c3::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #000000;
}

#nav .c3 a:hover {
  background-color: #2d2f3271;
}
</style>
