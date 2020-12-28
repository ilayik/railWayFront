<template>
  <div>
    <br>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <p align="center"> Please enter the train number </p>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
              v-model="trainNumber"
              :items="allTrainNumber"
              label="Trains"
              solo
              @click="getAllTrainNumber"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="9" v-if="fl">
          <v-data-table
              :headers="headers"
              :items="UsersByTrainNumber"
              item-key="name"
              class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>


</template>

<script>
export default {

  data: () => ({
    headers: [
      {text: 'username', value: 'username'},
      {text: 'firstName', value: 'firstName'},
      {text: 'lastName', value: 'lastName'},
    ],
    fl: false,
    allTrain: {},
    allTrainNumber: [],
    trainNumber: '',
    UsersByTrainNumber: [],
    url: {
      alltrain: 'http://localhost:8090/api/v1/trains',
      getUsersByTrainNumber: 'http://localhost:8090/api/v1/users/on-train',
    }
  }),
  watch: {
    trainNumber() {
      this.axios.get(this.url.getUsersByTrainNumber, {params: {trainNumber: this.trainNumber}})
          .then(response => {
            this.UsersByTrainNumber = response.data;
            console.log(response.data);
            this.fl = true;
          });

    },
  },

  created() {
    this.axios.get(this.url.alltrain)
        .then(response => this.allTrain = response.data);
  },
  methods: {
    getAllTrainNumber() {
      this.allTrain.forEach(train => {
        this.allTrainNumber.push("№ " + train.number);
      })
    },
  }
}
</script>
<style>

</style>