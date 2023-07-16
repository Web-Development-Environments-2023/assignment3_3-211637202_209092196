<template>
  <div class="not-found-page">
    <h1 class="title">Oops!</h1>
    <p class="description">We couldn't find the page you're looking for.</p>
    <div class="moving-elements">
      <div v-for="element in movingElements" :key="element.id" class="moving-element" :style="element.style"></div>
    </div>
    <button class="back-button" @click="goBack">Go Back</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movingElements: [
        { id: 1, style: { top: '50%', left: '30%', transform: 'rotate(-45deg)' } },
        { id: 2, style: { top: '20%', left: '70%', transform: 'rotate(135deg)' } },
        { id: 3, style: { top: '80%', left: '40%', transform: 'rotate(-90deg)' } },
        { id: 4, style: { top: '70%', left: '80%', transform: 'rotate(45deg)' } },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Go back to the previous page using Vue Router
    },
  },
};
</script>

<style scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.title {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #ff4081;
}

.description {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #888;
}

.moving-elements {
  position: relative;
  width: 200px;
  height: 200px;
}

.moving-element {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #00bcd4;
  border-radius: 50%;
  animation: moveElement 3s infinite alternate;
}

@keyframes moveElement {
  from {
    top: 0;
    left: 0;
  }
  to {
    top: 150px;
    left: 150px;
  }
}

.back-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #ff4081;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.back-button:hover {
  background-color: #ff80ab;
}
</style>
