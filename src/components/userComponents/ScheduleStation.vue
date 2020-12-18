<template>
  <v-app>
    <br>
    <br>
    <v-container>
      <v-row justify="center">
        <v-col class="d-flex" cols="3" sm="6">
          <v-select
              v-model="stationName"
              :items="allStationName"
              label="Stations"
              solo
              @click="getAllStationName"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="9" v-if="fl">
          <v-data-table
              :headers="headers"
              :items="scheduleStation1"
              item-key="name"
              class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import moment from 'moment'

export default {

  data: () => ({
    headers: [
      {text: '', value: ''},
      {text: '', value: ''}
    ],
    fl: false,
    allStation: {},
    allStationName: [],
    stationName: '',
    scheduleStation: [],
    scheduleStation1: [],
    url: {
      allstation: 'http://localhost:8090/allStation',
      getScheduleStation: 'http://localhost:8090/SchedulesByStation',
    }
  }),
  watch: {
    stationName() {
      this.axios.get(this.url.getScheduleStation, {params: {stationName: this.stationName}})
          .then(response => {
            this.scheduleStation = response.data;
            this.scheduleStation1 = [];
            this.scheduleStation.forEach(schedul => {
              schedul.arrival = moment(schedul.arrival).format('L');
              console.log(schedul.arrival);
              this.scheduleStation1.push(schedul);
              this.fl = true;
            });
          });

    },
    fl() {
      this.headers[0].text = 'Train №';
      this.headers[0].value = 'trainNumber';
      this.headers[1].text = 'Date arrivel';
      this.headers[1].value = 'arrival';
    }
  },

  created() {
    this.axios.get(this.url.allstation)
        .then(response => this.allStation = response.data);
  },
  methods: {
    getAllStationName() {
      this.allStation.forEach(station => {
        this.allStationName.push(station.name);
      })
    },
  }
}
</script>
<style>

</style>