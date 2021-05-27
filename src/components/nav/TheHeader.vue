<template>
  <header
    class="header d-flex align-items-center justify-content-between"
    :class="{ headerboards: isBoard, headerboardslist: isBoardList }"
  >
    <!-- Badges on the left side -->
    <div class="header-boards d-flex align-items-center justify-content-start">
      <div class="header-boards__more" @click="dialogIsOpen = !dialogIsOpen">
        <base-badge>
          <i class="fas fa-th"></i>
        </base-badge>
      </div>
      <!-- FIRST MODAL ATLASSIAN PRODUCTS -->

      <base-modal v-if="dialogIsOpen" @close="closeDialog">
        <template v-slot:header>
          <p class="mr-5 modalheader text-center">More from Atlasian</p>
        </template>
        <template v-slot:body>
          <div
            class="
              modal-switch__box
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <p class="modal-switch__box-text">Switch to</p>
            <div class="modal-switch__box--atlassian d-flex align-items-center">
              <a href="#" style="color: #0065FF">Atlassian Start</a>

              <i class="mx-3 fas fa-sign-in-alt" style="color: #0065FF"></i>
            </div>
          </div>
          <div class="modal-products">
            <div class="modal-products__item d-flex align-items-center">
              <img
                src="@/assets/jira.png"
                alt="jira logo"
                width="32"
                height="32"
                class="mr-2"
              />
              <p>Jira Software</p>
            </div>
            <div class="modal-products__item d-flex align-items-center">
              <img
                src="@/assets/bitbucket.png"
                alt="jira logo"
                width="32"
                height="32"
                class="mr-2"
              />
              <p>Bitbucket</p>
            </div>
            <div class="modal-products__item d-flex align-items-center">
              <img
                src="@/assets/trello.png"
                alt="jira logo"
                width="32"
                height="32"
                class="mr-2"
              />
              <p>Trello</p>
            </div>
          </div>
          <div class="modal-discover">
            <p class="modal-discover__text">Discover</p>
            <div class="modal-products__item d-flex align-items-center mb-3">
              <img
                src="@/assets/confluence.png"
                alt="jira logo"
                width="32"
                height="32"
                class="mr-2"
              />
              <div class="modal-products__item--description d-flex flex-column align-items-start">
                <p>Confluence</p>
                <p class="small">Document collaboration</p>
              </div>
            </div>
            <div class="modal-products__item d-flex align-items-center mb-3 mr-0">
              <img
                src="@/assets/jira_service.png"
                alt="jira logo"
                width="32"
                height="32"
                class="mr-2"
              />
              <div class="modal-products__item--description d-flex flex-column align-items-start">
                <p>Jira Service Management</p>
                <p class="small">Collaborative IT Service Management</p>
              </div>
            </div>
            <div class="modal-products__item d-flex align-items-center mb-3">
              <img
                src="@/assets/opsgenie.png"
                alt="jira logo"
                width="32"
                height="32"
                class="mr-2"
              />
              <div class="modal-products__item--description d-flex flex-column align-items-start">
                <p>Opsgenie</p>
                <p class="small">Modern incident management</p>
              </div>
            </div>
            <div class="modal-products__item d-flex align-items-center mb-5">
              <img
                src="@/assets/more_products.png"
                alt="jira logo"
                width="32"
                height="32"
                class="mr-2"
              />
                <p>More Atlassian products</p>
            </div>
          </div>
        </template>
      </base-modal>
      <div class="header-boards__home">
        <router-link to="/boards">
          <base-badge>
            <i class="fas fa-home"></i>
          </base-badge>
        </router-link>
      </div>
      <div class="header-boards__boards">
        <base-badge>
          <div class="d-flex align-items-center">
            <i class="fas fa-list-alt mr-3"></i>
            <p class="font-weight-bold text-white">Boards</p>
          </div>
        </base-badge>
      </div>
      <div class="header-boards__input">
        <base-badge
          class="header-boards__input-badge"
          v-if="showBadge"
          @click="showBadge = false"
        >
          <p class="text-white text-left mr-3 header-boards__input-badge-text">
            Jump to...
          </p>
          <i class="fas fa-search header-boards__input-badge-icon"></i>
        </base-badge>
        <div
          class="header-boards__input-container d-flex align-items-center"
          v-else
        >
          <input type="text" placeholder="Search..." />
          <i class="fas fa-times" @click="showBadge = true"></i>
        </div>
      </div>
    </div>
    <!-- Trello Logo -->
    <div class="header-logo text-center d-flex align-items-center">
      <i class="fas fa-list-alt mr-3 header-logo__icon"></i>
      <p class="header-logo__text">Trello</p>
    </div>
    <!-- Badges on the right side -->
    <div class="header-badges d-flex align-items-center justify-content-end">
      <div class="header-badges__add">
        <base-badge>
          <i class="fas fa-plus"></i>
        </base-badge>
      </div>
      <div class="header-badges__information">
        <base-badge>
          <i class="fas fa-info-circle"></i>
        </base-badge>
      </div>
      <div class="header-badges__notification">
        <base-badge>
          <i class="far fa-bell"></i>
        </base-badge>
      </div>
      <div class="header-badges__avatar">
        <img src="@/assets/user_avatar.jpg" alt="user picture" />
      </div>
    </div>
  </header>
</template>

<script>
import BaseModal from "../ui/BaseModal.vue";

export default {
  components: {
    BaseModal,
  },
  mounted() {
    this.emitter.on("board-list-loaded", (el) => {
      this.isBoardList = el;
      this.isBoard = !el;
    });
  },
  data() {
    return {
      showBadge: true,
      isBoard: true,
      isBoardList: false,
      dialogIsOpen: false,
    };
  },
  methods: {
    closeDialog() {
      this.dialogIsOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.modalheader {
  font-size: 1.4rem;
  line-height: 4rem;
  color: #5E6C84;
  margin-left: 7rem;

}
.modal-switch__box {
  margin-bottom: 3rem;
  font-size: 1.6rem;
  font-weight: 600;

  &-text {
    color: #172B4D;
    margin-left: 1.4rem;
  }

  &--atlassian {
    cursor: pointer;
  }
}

.modal-products {
  &__item {
    margin-bottom: 1.8rem;
    font-size: 1.4rem;
    margin-left: 1rem;
    margin-right: 10rem;
    cursor: pointer;
  }
}

.modal-discover {
  margin-top: 3.5rem;
  &__text {
    text-transform: uppercase;
    margin-left: 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.6rem;
    color: #6B778C;
    padding-bottom: 1rem;
  }
}

i {
  color: #ffffff;
}

.headerboards {
  background-color: #026aa7;
}

.headerboardslist {
  background-color: none;
}

.header {
  padding: 0.4rem;
  min-height: 4rem;
  max-height: 4rem;
  background-color: none;

  &-boards {
    flex: 0 0 45%;

    &__input {
      &-badge {
        width: 17rem;
        font-weight: 400;

        &-text {
          flex: 0 0 80%;
          cursor: text;
        }

        &-icon {
          flex: 1;
        }
      }

      &-container i {
        transform: translateX(-25px);
        color: rgba(23, 43, 77, 255);
        cursor: pointer;
      }
    }
  }

  &-logo {
    flex: 0 0 10%;
    font-size: 1.8rem;
    font-weight: 600;
    color: rgba(128, 180, 211, 255);
    cursor: pointer;

    &__icon {
      color: rgba(128, 180, 211, 255);
    }

    &:hover,
    &:hover i {
      color: rgba(204, 225, 237, 255);
    }
  }

  &-badges {
    flex: 1;

    &__avatar img {
      height: 3.2rem;
      width: 3.2rem;
      border-radius: 50%;
    }
  }

  input[type="text"] {
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    width: 28rem;
    &:focus {
      outline: none;
    }
  }
}

::-webkit-input-placeholder {
  color: #172b4d;
}
</style>
