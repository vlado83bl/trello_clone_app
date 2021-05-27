<template>
  <div>
    <h2>Test Component</h2>
    <div v-if="trelloData">
      <p v-for="data in trelloData" :key="data.id">Data from trello: {{ data.name }}</p>
    </div>
    <button @click="getData">Get data from trello</button>
    <input type="text" v-model="cardInput">
    <button @click="sendData">Send Data to Trello</button>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.getData();
      this.getList();
    },
    data() {
      return {
        trelloData: [],
        cardInput: ''
      }
    },
    methods: {
      async getData() {
        try {
          const response = await fetch('https://api.trello.com/1/cards/60abc8a41092d4681b901941?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664');
          const data = await response.json();
          this.trelloData.push(data)
          // console.log(data);
        } catch (error) {
          console.log(error);
        }
      }, 
      async getList() {
        const response = await fetch('https://api.trello.com/1/lists/60abc85af4981a398a902350?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664');
        const data = await response.json();
        console.log('NIJE BITNO', data.id);
      },
      async sendData() {
        fetch(`https://api.trello.com/1/cards?key=d5116cdc7cd44da836b2546d0a1ec033&token=440269d91d9b3f0a1818d3bf9c8947edd31a8af0bab746b6c679055004729664&idList=60abc85af4981a398a902350&name=${this.cardInput}`, {
          method: 'POST'
        })
        .then(response => response.json())
        .then(data => console.log(data));

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>