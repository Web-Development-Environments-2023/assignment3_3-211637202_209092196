<template>
  <div class="about-page">
    <h1 class="title">🌮 About Us 🍔</h1>
    <div class="marketing-brief">
      <h2 class="section-title">Development Team 🚀</h2>
      <p>
        We are a bunch of crazy foodies and tech enthusiasts who came together to create this mind-blowing recipe site.
        Our team consists of talented developers, designers, and master chefs who collaborate to deliver an
        extraordinary culinary experience to our users. 🍳👩‍🍳👨‍🍳
      </p>
      <p>
        With our coding skills and love for cooking, we aim to provide a platform that will make you go ROFL while
        satisfying your taste buds. 😂🍽️
      </p>
      <h2 class="section-title">Project Brief 📋</h2>
      <p>
        Brace yourself for the ultimate food adventure! Our recipe site is the wildest dream come true for all your
        culinary needs. Powered by Spoonacular API, we offer a mind-boggling collection of insanely delicious recipes
        from around the world, catering to all dietary preferences and cooking skill levels. 🌍🌶️🍣
      </p>
      <p>
        Prepare to have your mind blown with our detailed instructions, secret ingredient lists, mind-altering
        nutritional information, and cooking tips that will make you a culinary genius. 🧠💥🍓
      </p>
      <p>
        Our mission is to inspire your wildest food fantasies, simplify your meal planning, and create a community of
        food enthusiasts who can connect and share their love for cooking. Let's get this food party started! 🎉🎊🎈
      </p>
      <h2 class="section-title">Previous Exercises 💪</h2>
      <ul class="exercise-list">
        <li>
          <a href="https://github.com/Web-Development-Environments-2023/assignment2-209092196_211637202">
            Exercise 1: 🚀 Spaceship Game 🕹️
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  position: relative;
  padding: 2rem;
  background: linear-gradient(to bottom right, #ffc0cb, #add8e6);
  overflow: hidden;
  width: 100%;
  height: 100vh;
  margin-bottom: 0; /* Add this line to remove bottom margin */
}

.about-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw; /* Use viewport width */
  height: 100vh; /* Use viewport height */
  background-image: url('https://example.com/moving-elements.gif');
  background-repeat: repeat;
  background-position: 0 0;
  background-size: 300px 300px;
  opacity: 0.5;
  z-index: -1;
  animation: moveBackground 10s linear infinite;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ff00ff; /* Bright pink! */
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #39ce39; /* Bright green! */
}

.marketing-brief {
  margin-top: 2rem;
  color: #0000ff; /* Bright blue! */
}

.exercise-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.exercise-list li {
  margin-bottom: 0.5rem;
}

.exercise-list li a {
  color: #ff0000; /* Bright red! */
  text-decoration: none;
}

.exercise-list li a:hover {
  text-decoration: underline;
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes moveBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1000px 1000px;
  }
}

.about-page::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://example.com/moving-elements.gif'); /* Replace with your moving elements background image */
  background-repeat: repeat;
  background-position: 0 0;
  background-size: 300px 300px;
  opacity: 0.5;
  z-index: -1;
  animation: moveBackground 10s linear infinite;
}
</style>
