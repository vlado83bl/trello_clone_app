<template>
  <nav class="sidebar" v-if="!isBoardList">
    <ul class="side-nav">
      <li class="side-nav__item side-nav__item--active">
        <router-link to="/boards" tag="li" class="side-nav__link">
          <i class="mr-2 far fa-clipboard"></i>
          <span>Boards</span>
        </router-link>
      </li>
      <li class="side-nav__item">
        <a href="#" class="side-nav__link">
          <i class="mr-2 fas fa-clipboard"></i>
          <span>Templates</span>
        </a>
      </li>
      <li class="side-nav__item">
        <a href="#" class="side-nav__link">
          <i class="mr-2 fas fa-chart-line"></i>
          <span>Home</span>
        </a>
      </li>
      <li class="side-nav__item">
        <a href="#" class="side-nav__link d-flex align-items-center">
          <span style="font-weight: 500; color: #5e6c84; font-size: 12px">
            WORKSPACES
          </span>
          <span class="ml-auto" style="font-size: 20px; color: #42526e">
            &#43;
          </span>
        </a>
      </li>

      <a
        href="#"
        class="side-nav__link side-nav__item d-flex align-items-center"
        @click="
          shown = !shown;
          rotateArrow();
        "
      >
        <i class="side-nav_icon fas fa-film mr-2 pt-1"></i>
        <span>Team Vlado</span>
        <span
          class="arrow ml-auto"
          ref="arrow"
          style="transform: rotate(180deg)"
        >
          <svg
            width="16"
            height="16"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7071 7.29289L19.7782 14.364C20.1687 14.7545 20.1687 15.3876 19.7782 15.7782C19.3877 16.1687 18.7545 16.1687 18.364 15.7782L12 9.41421L5.63606 15.7782C5.24554 16.1687 4.61237 16.1687 4.22185 15.7782C3.83132 15.3877 3.83132 14.7545 4.22185 14.364L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </a>

      <!--TEAM DROPDOWN-->

      <ul class="team-dropdown" v-if="shown">
        <li class="team-dropdown__item py-1 mt-4">
          <a href="#" class="team-dropdown__item--link">
            <i class="mr-2 far fa-check-square"></i>
            Getting started
          </a>
        </li>
        <li class="team-dropdown__item py-1">
          <a href="#" class="team-dropdown__item--link">
            <i class="mr-2 fas fa-border-all"></i>
            Boards
          </a>
        </li>
        <li class="team-dropdown__item py-1">
          <a href="#" class="team-dropdown__item--link">
            <i class="mr-2 far fa-heart"></i>
            Highlights
          </a>
        </li>
        <li class="team-dropdown__item py-1">
          <a href="#" class="team-dropdown__item--link">
            <i class="fas fa-table"></i>
            Workspace Table
          </a>
        </li>
        <li class="team-dropdown__item py-1">
          <a href="#" class="team-dropdown__item--link">
            <i class="fas fa-user-friends"></i>
            Members
          </a>
        </li>
        <li class="team-dropdown__item py-1">
          <a href="#" class="team-dropdown__item--link">
            <i class="fas fa-cog"></i>
            Settings
          </a>
        </li>
      </ul>
    </ul>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.emitter.on('board-list-loaded', el => { this.isBoardList = el; })
  },
  data() {
    return {
      shown: false,
      isBoardList: false
    };
  },
  methods: {
      rotateArrow() {
        var arrow = this.$refs.arrow;
        arrow.style.transform == "rotate(180deg)"
          ? (arrow.style.transform = "rotate(0deg)")
          : (arrow.style.transform = "rotate(180deg)");

    },
  },
};
</script>

<style lang="scss" scoped>
//SIDEBAR STYLING
.sidebar {
  position: sticky;
  top: 0;
}

.side-nav {
  margin-top: 4rem;
  padding: 0 0 0 8rem;
  list-style-type: none;

  i {
    width: 2rem;
    height: 2rem;
    color: #676c74;
  }

  &__item {
    padding: 0.6rem;
    margin-bottom: 0.5rem;
    border-radius: 5%;

    &--active {
      background-color: rgba(228,240,246,255);

      &:hover {
        background-color: rgba(228,240,246,255) !important;
      }
    }

    &:hover {
      background-color: rgba(231, 233, 237, 255);
    }
  }

  &__link:link,
  &__link:visited,
  .team-dropdown__item--link:link,
  .team-dropdown__item--link:visited {
    text-decoration: none;
    display: block;
    width: 100%;
  }

  &__link:link,
  &__link:visited {
    color: #091e42;
    font-size: 1.4rem;
    font-weight: 700;
  }
}

// TEAM DROPDOWN STYLING
.team-dropdown {
  list-style: none;

  &__item {
    padding: 0.6rem;
    margin-bottom: 1rem;
    border-radius: 5%;

    &:hover {
      background-color: rgba(231, 233, 237, 255);
    }

    &--link {
      color: #091e42;
      font-size: 12px;
    }
  }
}
</style>
