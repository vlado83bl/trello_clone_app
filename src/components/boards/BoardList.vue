<template>
  <div>
    <div class="boardlist-container d-flex align-items-start p-3 mr-2">
      <the-list 
        v-for="trelloListObject in trelloListObjects" 
        :key="trelloListObject" 
        @listOpened="openLists += $event" 
        :trelloListObject="trelloListObject"
        id="trelloListObject.id"
        ></the-list>
    </div>
  </div>
</template>

<script>
import TheList from "./TheList.vue";
export default {
  mounted() {
    this.emitter.emit("board-list-loaded", true);
    // this.emitter.on("list-names", (el) => {
    //   this.listNames = el;
    // });
    this.getListsFromTrello();
    // this.getCardsFromTrello();
  },
  data() {
    return {
      openLists: 1,
      trelloListNames: [],
      trelloListIDs: [],
      trelloListObjects: [],
      idBoard: '60abc819bc426834ddf21de9',
      key: 'd5116cdc7cd44da836b2546d0a1ec033',
      token: '440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664',
    }
  },
  methods: {
    async getListsFromTrello() {   
        const response = await fetch(`https://api.trello.com/1/boards/${this.idBoard}/lists?key=${this.key}&token=${this.token}`);
        const data = await response.json();
        data.forEach(el => {
          const trelloListObject = {
            name: el.name,
            id: el.id
          }
          this.trelloListObjects.push(trelloListObject);
        })
        console.log(this.trelloListIDs);
      },
      async getCardsFromTrello(listID) {   
        const response = await fetch(`https://api.trello.com/1/lists/${listID}/cards?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664`);
        const data = await response.json();
        console.log('CARDS', data);
      },
    // getDataFromTrello() {
    //   var self = this;
    //   this.cards.forEach(el => self.getCardFromTrello(el.id));
    // }, 
  },
  components: {
    TheList,
  },
};
</script>

<style lang="scss" scoped>
</style>
