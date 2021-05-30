<template>
  <div class="content" :class="{ 'content-background': this.$route.path.includes('/boardlist')}">
    <the-header></the-header>
    <div class="main d-flex" :class="{ maincontainer: this.$route.path.includes('/boards') }">
      <side-menu class="side-menu"></side-menu>
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/nav/TheHeader.vue";
import SideMenu from "./components/nav/SideMenu.vue";

export default {
  components: {
    TheHeader,
    SideMenu,
  },
};
</script>

<style lang="scss">

$bp-largest: 75em; //1200px;
$bp-large: 68.75em; //1100px;
$bp-medium: 56.25em; //900px;
$bp-small: 37.5em; //600px;
$bp-smallest: 31.25em; //500px;



body,
button,
html,
input,
select,
textarea {
  font-size: 1.4rem;
}

html {
  font-family: Roboto;
  box-sizing: border-box;
  font-size: 62.5%; //1rem = 10px;

  @media only screen and (max-width: $bp-large) {
    font-size: 50%; //1rem = 8px;
  }
}

p {
  margin-bottom: 0 !important;
}

body {
  margin: 0;
}

.content {
  min-height: 100vh;
}

.content-background {
  background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1801x1920/14fc8fa10b916e5f595bb326d9b6e899/photo-1621577645530-dcc7e0771c54.jpg");
  background-position: center;
  background-size: cover;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

.side-menu {
  flex: 0 0 25%;
}

.maincontainer {
  margin: 0 6rem;
}

.main-content {
  flex: 1;
}
</style>
