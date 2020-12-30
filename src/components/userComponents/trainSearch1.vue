
<template>
<div>
<v-app id="inspire">
<v-container >
  <v-row align="center">
    <v-col class="d-flex" cols="12" sm="6">
      <v-select
          v-model="stationA"
          :items="allStationName"
          label="Station A"
          solo
          @click="getAllStationName"
      ></v-select>
    </v-col>
    <v-col class="d-flex" cols="12" sm="6">
      <v-select
          v-model="stationB"
          :items="allStationName"
          solo
          label="Station B"
          @click="getAllStationName"
      ></v-select>
    </v-col>
    <v-col class="d-flex" cols="12" sm="6">
      <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateAFormatted"
              label="Date A"
              hint="DD/MM/YYYY format"
              persistent-hint
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateA" no-title @input="menu1 = false"></v-date-picker>
      </v-menu>
    </v-col>

    <v-col class="d-flex" cols="12" sm="6">
      <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateBFormatted"
              label="Date B"
              hint="DD/MM/YYYY format"
              persistent-hint
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateB" no-title @input="menu2 = false"></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
  <br>
  <v-btn type="button" @click="trainSearch">Train search</v-btn>
  <br>
  <br>
  <hr>
  <br>
  <br>
  <train v-for="(train, id) of TRAINS" :key="id" v-bind:train="train"/>
  <form v-if="TRAINS.length === 0">
    <p>There is no suitable train</p>
  </form>
</v-container>
</v-app>
</div>
</template>

<script>
import train from "./train";

export default {
  components:{
    train
  },
  data: vm => ({
    // sessionUsers: {},
    TRAINS:[],
    allStation: {},
    allStationName: [],
    stationA: '',
    stationB: '',
    dateA: new Date().toISOString().substr(0, 10),
    dateB: new Date().toISOString().substr(0, 10),
    dateAFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateBFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    url: {
      findTrainPost: 'http://localhost:8090/api/v1/trains/find',
      allstation: 'http://localhost:8090/api/v1/stations',
      getLastUser: 'http://localhost:8090/api/v1/users/get-last'
    }
  }),
  created() {
    this.axios.get(this.url.allstation)
        .then(response => this.allStation = response.data);
    // this.axios.get(this.url.getLastUser)
    //     .then(response => {
    //       this.sessionUsers = response.data;
    //       console.log('user session - ', this.sessionUsers)
    //         });
  },
  watch: {
    dateA () {
      this.dateAFormatted = this.formatDate(this.dateA)
    },
    dateB () {
      this.dateBFormatted = this.formatDate(this.dateB)
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    getAllStationName() {
      this.allStation.forEach(station =>{
        this.allStationName.push(station.name);
      })
    },

    trainSearch() {
      this.axios.post(this.url.findTrainPost,[this.stationA, this.stationB, this.dateAFormatted, this.dateBFormatted] )
          .then(response => {
            this.TRAINS = response.data;
            console.log('Найденные поезда', this.TRAINS);
          });

    },

  }
}
</script>