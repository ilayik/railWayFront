<template>
  <div>
    <br>
    <br>
    <v-container>
      <v-row justify="center">
        <v-data-table
            :headers="headers"
            :items="allTrains"
            item-key="name"
            class="elevation-1">
        </v-data-table>
      </v-row>
    </v-container>
  </div>

</template>

<script>
export default {
  data: () => ({
    headers: [
      {text: 'Train №', value: 'number'},
      {text: 'Capacity', value: 'capacity'}
    ],
    allTrains: [],
    url: {
      alltrains: 'http://localhost:8090/api/v1/trains',
    },
  }),
  created() {
    this.axios.get(this.url.alltrains)
        .then(response => {
          console.log(response.data);
          this.allTrains = response.data;
        })
  }
}
</script>

<style scoped>

</style>