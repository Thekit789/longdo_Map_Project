<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/LongDoMap">MAP</RouterLink>
  </nav>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  /* color: var(--color-text); */
  color: #403f3f;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-weight: 600;
}

nav a:hover {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  border-radius: 10px;
}

nav a:first-of-type {
  border: 0;
}

/* ---  CSS สำหรับ Transition ที่นี่ --- */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- จบส่วน CSS สำหรับ Transition --- */

@media (min-width: 1024px) {
  .main-layout {
    display: flex;
    justify-content: space-around;
    width: 100%;
    min-height: 100vh;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    width: 400px;
    font-size: 2rem;
    padding: 2rem 0;
    margin-top: 1rem;
  }
}
</style>
