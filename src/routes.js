import Main from './pages/MainPage';
import NotFound from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./pages/RegisterPage'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/LoginPage'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./pages/SearchPage'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/AboutPage'),
  },
  {
    path: '/recipe/:recipeId',
    name: 'recipe',
    component: () => import('./pages/RecipeViewPage'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('./pages/FavoriteRecipesPage'),
  },
  {
    path: '/myRecipes',
    name: 'myRecipes',
    component: () => import('./pages/MyRecipesPage'),
  },
  {
    path: '/familyRecipes',
    name: 'familyRecipes',
    component: () => import('./pages/FamilyRecipesPage'),
  },
  {
    path: '/myRecipes/:title',
    name: 'myRecipes',
    component: () => import('./pages/MyRecipesViewPage'),
  },
  {
    path: '/familyRecipes/:title',
    name: 'familyRecipes',
    component: () => import('./pages/FamilyRecipesViewPage'),
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
];

export default routes;
