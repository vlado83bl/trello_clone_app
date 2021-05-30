<template>
  <div 
    class="mr-3"
    :id="id"
    >
    <div @click="openAddListField" v-if="addListButtonDisplayed" class="add-list-button d-flex align-items-center">
      <span class="mx-3 pb-1" style="font-size: 20px; color: #fff">&#43;</span>
      <p>Add a list</p>
    </div>
    <div v-if="addListFieldDisplayed" class="add-list-field d-flex flex-column align-items-start">
      <input v-model="listName" @keyup.enter="addListName" type="text" class="add-list-field__input" placeholder="Enter list title...">
      <div class="d-flex align-items-center">
        <button @click="addListName" class="add-button mr-4 mt-2">Add list</button>
        <i @click="addListFieldDisplayed = false" class="fas fa-times pt-1"></i>
      </div>
    </div>
    <div v-if="addedListFieldDisplayed" class="added-list-field d-flex flex-column">
      <div class="added-list-field__name d-flex align-items-center mb-2">
        <p class="ml-1 font-weight-bold">{{ trelloListObject.name }}</p>
        <i class=" ml-auto fas fa-ellipsis-h"></i>
      </div>
      <div @click="openAddCardField" class="added-list-field__card d-flex align-items-center">
        <span class="mx-3 pb-1" style="font-size: 20px; color: #42526E">&#43;</span>
        <p>Add a card</p>
      </div>
    </div>
    <div v-if="addCardFieldDisplayed" class="add-card-field d-flex flex-column align-items-start">
      <div class="add-card-field__name d-flex align-items-center mb-3">
        <p class="ml-1 font-weight-bold">{{ trelloListObject.name }}</p>
        <i class="ml-auto fas fa-ellipsis-h"></i>
      </div>
      <div class="added-cards">
        <the-card 
          v-for="(card, i) in cards" 
          :key="card.id" 
          :card="card"
          id="card.id"
          draggable="true"
          @dragstart="dragStart(i, $event)" 
          @dragover.prevent 
          @dragenter="dragEnter" 
          @dragleave="dragLeave" 
          @dragend="dragEnd" 
          @drop="dragFinish(i, $event)"
          >
        </the-card>
      </div>
      <textarea @keyup.enter="addCardName" v-model="cardName" rows="3" placeholder="Enter a title for this card..."></textarea>
      <div class="add-card-field__add mt-2 d-flex align-items-center">
        <button @click="addCardName" class="add-button mr-4 mt-2">Add card</button>
        <i @click="addCardFieldDisplayed = false" class="fas fa-times pt-1"></i>
        <i class="ml-auto fas fa-ellipsis-h"></i>
      </div>
    </div>
  </div>
</template>

<script>
import TheCard from '../cards/TheCard.vue';

export default {
  props: ['trelloListObject', 'id'],
  mounted() {
    // this.getListsFromTrello();
    // this.initData();
    this.getCardsFromTrello(this.trelloListObject.id);
  },
  components: {
    TheCard
  },
  data() {
    return {
      addListButtonDisplayed: true,
      addListFieldDisplayed: false,
      addedListFieldDisplayed: false,
      addCardFieldDisplayed: true,
      listName: '',
      cardName: '',
      cardNames: [],
      cards: [],
      idBoard: '60abc819bc426834ddf21de9',
      key: 'd5116cdc7cd44da836b2546d0a1ec033',
      token: '440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664',
      lists: [],
      dragging: -1
    }
  },
  provide() {
    return {
      removeCard: this.deleteCard
    };
  },
  methods: {
    dragStart(which, ev) {
      ev.dataTransfer.setData('Text', this.id);
      ev.dataTransfer.dropEffect = 'move'
      this.dragging = which;
    },
    dragEnter(ev) {
      console.log(ev);
    },
    dragEnd(ev) {
      this.dragging = -1;
      console.log(ev);
    },
    dragFinish(to, ev) {
      this.moveItem(this.dragging, to);
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
    },
    moveItem(from, to) {
      if (to === -1) {
        this.removeItemAt(from);
      } else {
        this.cards.splice(to, 0, this.cards.splice(from, 1)[0]);
      }
    },
    removeItemAt(index) {
      this.cards.splice(index, 1);
    },
    dragLeave(ev) {
      console.log(ev);
      },
    openAddListField() {
      this.addListFieldDisplayed = true;
      this.addListButtonDisplayed = false;
      this.$emit('listOpened', 1);
      this.emitter.emit("list-names", this.listNames);
    },
    async addListName() {
      fetch(`https://api.trello.com/1/lists?key=${this.key}&token=${this.token}&name=${this.listName}&idBoard=${this.idBoard}`, {
        method: 'POST'
      }).then(response => response.json())
      .then((data) => {
        const list = {
          name: data.name,
          id: data.id
        }
        this.lists.push(list);
        console.log(this.lists);
        const listNames = [];
        this.lists.forEach(el => listNames.push(el.name));
        this.listNames = listNames;
        console.log(this.listNames);
      })
      this.addListFieldDisplayed = false;
      this.addedListFieldDisplayed = true;
    },
    async addCardName() {
      fetch(`https://api.trello.com/1/cards?key=${this.key}&token=${this.token}&idList=${this.trelloListObject.id}&name=${this.cardName}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then((data) => {
        const card = {
        name: data.name,
        id: data.id
        };
        this.cards.push(card);
      });
      this.cardName = '';
    }, 
      async getCardsFromTrello(listID) {   
        const response = await fetch(`https://api.trello.com/1/lists/${listID}/cards?key=${this.key}&token=${this.token}`);
        const data = await response.json();
        console.log('CARDS', data);
        data.forEach(el => this.cards.push(el));
        this.cards.forEach(el => console.log(el.name));

      },
    openAddCardField() {
      this.addCardFieldDisplayed = true;
      this.addedListFieldDisplayed = false;
    },
    async deleteCard(cardId) {
      fetch(`https://api.trello.com/1/cards/${cardId}?key=${this.key}&token=${this.token}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then((data) => {
        // const card = {
        // name: data.name,
        // id: data.id
        // };
        // this.cards.push(card);
        console.log('data nakon brisanja', data);
      });
      const cardIndex = this.cards.findIndex(el => el.id === cardId);
      this.cards.splice(cardIndex, 1);
    }, 
  },
};
</script>

<style lang="scss" scoped>
.add-list-button {
  width: 27rem;
  height: 4rem;
  background-color: #ffffff25;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.add-list-field,
.added-list-field {
  width: 27rem;
  height: 8rem;
  border-radius: 5px;
  background-color: #ffffffd3;
}

.add-list-field {
  color: #172B4D;
  padding: .4rem;

  &__input {
    border: 2px solid #0079bf;
    border-radius: 5px;
    width: 100%;
    padding: .6rem 1.2rem;
    font-size: 1.4rem;

    &:focus,
    &:active {
      outline: none;
    }
  }
}

.add-list-field,
.add-card-field {
  & i {
    color: #172b4dab;
    font-size: 1.8rem;
  }
}

.add-button {
  padding: .4rem 1.2rem;
  background-color: #0079BF;
  border: none;
  border-radius: 5px;
  color: #fff
}

.added-list-field,
.add-card-field {
  padding: 1rem 1.6rem;
  color: #172B4D;

}

.added-list-field {

  &__card {
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #091e422c;
    }
  }
}

.add-card-field {
  width: 27rem;
  min-height: 16rem;
  border-radius: 5px;
  background-color: #ffffffd3;

  &__name {
    width: 100%;
  }

  textarea {
    border: none;
    border-radius: 5px;
    resize: none;
    outline: none;
    width: 100%;
  }

  &__add {
    width: 100%;
  }
}

.added-cards {
  width: 100%;
}

i {
  cursor: pointer;
}
</style>
