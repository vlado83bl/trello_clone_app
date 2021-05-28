<template>
  <div class="mr-3">
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
        <p class="ml-1 font-weight-bold">{{ listName }}</p>
        <i class=" ml-auto fas fa-ellipsis-h"></i>
      </div>
      <div @click="openAddCardField" class="added-list-field__card d-flex align-items-center">
        <span class="mx-3 pb-1" style="font-size: 20px; color: #42526E">&#43;</span>
        <p>Add a card</p>
      </div>
    </div>
    <div v-if="addCardFieldDisplayed" class="add-card-field d-flex flex-column align-items-start">
      <div class="add-card-field__name d-flex align-items-center mb-3">
        <p class="ml-1 font-weight-bold">{{ listName }}</p>
        <i class="ml-auto fas fa-ellipsis-h"></i>
      </div>
      <div class="added-cards">
        <the-card v-for="card in cards" :key="card.id" :card="card"></the-card>
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
  mounted() {
    this.getCardsFromTrello();
  },
  components: {
    TheCard
  },
  data() {
    return {
      addListButtonDisplayed: true,
      addListFieldDisplayed: false,
      addedListFieldDisplayed: false,
      addCardFieldDisplayed: false,
      listName: '',
      cardName: '',
      cards: [
      ],
      boardID: '60abc819bc426834ddf21de9'
    }
  },
  methods: {
    openAddListField() {
      this.addListFieldDisplayed = true;
      this.addListButtonDisplayed = false;
      this.$emit('listOpened', 1);
    },
    addListName() {
      this.addListFieldDisplayed = false;
      this.addedListFieldDisplayed = true;
    },
    async addCardName() {
      var self = this;
      fetch(`https://api.trello.com/1/cards?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664&idList=60b1045f18f54d2aec0de782&name=${this.cardName}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then((data) => {
        const card = {
        name: data.name,
        id: data.id
        };
        self.cards.push(card);
        console.log(self.cards);
      });
      self.cardName = '';
    },
    // async getCardFromTrello(cardID) {
    //   try {
    //     const response = await fetch(`https://api.trello.com/1/cards/${cardID}?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664`);
    //     const data = await response.json();
    //     this.trelloData.push(data)
    //     // console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, 
    async getListsFromTrello() {   
        const response = await fetch('https://api.trello.com/1/boards/60abc819bc426834ddf21de9/lists?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664');
        const data = await response.json();
        console.log('LISTE', data);
      },
    async getListFromTrello() {   
        const response = await fetch('https://api.trello.com/1/lists/60b1045f18f54d2aec0de782?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664');
        const data = await response.json();
        console.log('LISTA', data);
      },
      async getCardsFromTrello() {   
        const response = await fetch('https://api.trello.com/1/lists/60b1045f18f54d2aec0de782/cards?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664');
        const data = await response.json();
        console.log('LISTA', data);
      },
    // getDataFromTrello() {
    //   var self = this;
    //   this.cards.forEach(el => self.getCardFromTrello(el.id));
    // }, 
    openAddCardField() {
      this.addCardFieldDisplayed = true;
      this.addedListFieldDisplayed = false;
    }
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
