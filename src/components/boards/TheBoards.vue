<template>
  <div class="main pl-3">
    <div class="boards-recently-viewed">
      <div
        class="boards-recently-viewed__header d-flex align-items-center mb-4"
      >
        <i class="far fa-clock mr-4"></i>
        <p>Recently viewed</p>
      </div>
      <div class="boards-recently-viewed__list d-flex">
        <base-template
          v-for="template in trelloTemplates"
          :key="template.id"
          :backgroundImage="template.backgroundImage"
          :isTemplate="template.isTemplate"
        >
          <template v-slot:template></template>
          <template v-slot:title>{{ template.title }}</template>
        </base-template>
      </div>
    </div>
    <div class="boards-workspace d-flex flex-column">
      <div class="boards-workspace__header mb-3">
        <p class="boards-workspace__header--title mb-5">YOUR WORKSPACES</p>
        <div class="boards-workspace__content d-flex align-items-center">
          <div
            class="boards-workspace__content--team d-flex align-items-center"
          >
            <div
              class="
                boards-workspace__content--team-box
                d-flex
                align-items-center
                justify-content-center
                mr-2
              "
            >
              <p>T</p>
            </div>
            <p class="boards-workspace__content--team-text">Team Vlado</p>
          </div>
          <div class="ml-auto d-flex">
            <div class="boards-workspace__content--item mr-3 py-2 px-3">
              <i class="mr-3 far fa-clipboard"></i>
              <span>Boards</span>
            </div>
            <div class="boards-workspace__content--item mr-3 py-2 px-3">
              <i class="mr-3 fas fa-table"></i>
              <span>Workspace table</span>
            </div>
            <div class="boards-workspace__content--item mr-3 py-2 px-3">
              <i class="mr-3 far fa-user"></i>
              <span>Members (1)</span>
            </div>
            <div class="boards-workspace__content--item mr-3 py-2 px-3">
              <i class="mr-3 fas fa-cog"></i>
              <span>Settings</span>
            </div>
            <div class="boards-workspace__content--item mr-3 py-2 px-3">
              <i class="mr-3 fas fa-suitcase"></i>
              <span>Upgrade</span>
            </div>
          </div>
        </div>
      </div>
      <div class="boards-workspace__templates d-flex align-items-center">
        <base-template
          v-for="template in vladoTemplates"
          :key="template.id"
          :backgroundImage="template.backgroundImage"
          :isTemplate="template.isTemplate"
        >
          <template v-slot:template></template>
          <template v-slot:title>{{ template.title }}</template>
        </base-template>
        <div
          class="
            boards-workspace__templates--create
            d-flex
            align-items-center
            justify-content-center
          "
        >
          Create new Board
        </div>
      </div>
      <div class="boards-workspace__content--closed">
        <span>View all closed boards</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.trelloTemplates);
  },
  data() {
    return {
      templates: [
        {
          id: 1,
          isTemplate: false,
          title: "Test Board",
          backgroundImage:
            'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1801x1920/14fc8fa10b916e5f595bb326d9b6e899/photo-1621577645530-dcc7e0771c54.jpg")',
          team: ["Trello", "Vlado"],
        },
        {
          id: 2,
          isTemplate: true,
          title: "Project Management",
          backgroundImage:
            'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x336/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg")',
          team: ["Trello"],
        },
        {
          id: 3,
          isTemplate: true,
          title: "Kanban Template",
          backgroundImage:
            'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg")',
          team: ["Trello"],
        },
        {
          id: 4,
          isTemplate: true,
          title: "Agile Sprint Board",
          backgroundImage:
            'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/e8a76cd7622d8889d42c2977427bb584/photo-1515079424831-8fce6574676d.jpg")',
          team: ["Trello"],
        },
        {
          id: 4,
          isTemplate: false,
          title: "Test",
          backgroundImage:
            'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/4d64038155d53b3d47856031e7ce640a/photo-1618176729090-253077a8f948.jpg")',
          team: ["Vlado"],
        },
      ],
    };
  },
  computed: {
    trelloTemplates() {
      return this.templates.filter((template) =>
        template.team.includes("Trello")
      );
    },
    vladoTemplates() {
      return this.templates.filter((template) =>
        template.team.includes("Vlado")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin headingFont {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  white-space: nowrap;
}

.main {
  margin: 4rem 1.6rem 0;
  max-width: 86rem;
}

.boards-recently-viewed {
  &__list {
    margin-bottom: 8rem;
  }

  &__header {
    font-size: 2rem;

    & p {
      @include headingFont;
    }

    & i {
      color: #42526e;
    }
  }
}

.boards-workspace {
  &__header {
    &--title {
      @include headingFont;
    }
  }

  &__content {
    &--team {
      &-box {
        width: 3.6rem;
        height: 3.6rem;
        background: linear-gradient(to right top, #0088a6, #074aa6);
        border-radius: 5px;
        @include headingFont;
        color: #fff;
      }

      &-text {
        @include headingFont;
      }
    }

    &--item {
      background-color: rgba(240, 242, 245, 255);

      &:last-child {
        background-color: #dfc0eb;
      }

      & i {
        color: #42526e;
      }
    }

    &--closed {
      padding: .8rem 1.2rem;
      margin-top: 4rem;
      background-color: rgba(240, 242, 245, 255);
      width: fit-content;
    }
  }

  &__templates {
    &--create {
      background-color: rgba(9, 30, 66, 0.04);
      max-width: 20rem;
      min-width: 20rem;
      height: 9.6rem;
    }
  }

  &__content--item,
  &__content--closed,
  &__templates--create {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: rgba(9, 30, 66, 0.103);
      }
  }

}

.fa-suitcase {
  background-color: rgba(137, 96, 158, 255);
  padding: 0.4rem;
  border-radius: 3px;
  color: #fff !important;
}
</style>
