<template>
  <div>
    <br>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <p align="center"> Please enter a free station name </p>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="stationName" label="Station name" :hint="stationNameMessage" required></v-text-field>
        </v-col>
        <form v-if="freeNameStatus" @submit.prevent="saveStation">
          <v-btn type="submit">Save Station</v-btn>
        </form>
        <v-col cols="12" v-if="newSchedulesStatus">
          <p align="center">{{ stationCreateMassage }} </p>
          <newSchedules v-bind:stationname="stationName"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import newSchedules from "./newSchedules";

export default {
  components: {
    newSchedules
  },
  data: () => ({
    station: {
      name: '',
    },
    newSchedulesStatus: false,
    stationCreateMassage: '',
    check: true,
    stationName: '',
    stationNameMessage: '',
    freeNameStatus: false,
    AllStation: [],
    url: {
      allStation: 'http://localhost:8090/api/v1/stations',
      saveStation: 'http://localhost:8090/api/v1/stations',
    }
  }),
  created() {
    this.getAllStation();
  },

  methods: {
    saveStation() {
      this.newSchedulesStatus = true;
      this.axios.post(this.url.saveStation, this.station)
          .then(
              response => {
                this.stationCreateMassage = 'Station ' + response.data.name + ' saved, please, add schedules';
              }
          )
    },
    getAllStation() {
      this.axios.get(this.url.allStation)
          .then(response => {
            this.AllStation = response.data;
            console.log(this.AllStation)
          })
    },
  },
  watch: {
    stationName() {
      this.check = true;
      this.AllStation.forEach(station => {
        if (this.check) {
          if (this.stationName !== '') {
            if (this.stationName === station.name) {
              this.stationNameMessage = 'Name "' + this.stationName + '" is used';
              this.freeNameStatus = false;
              this.newSchedulesStatus = false;
              this.check = false;
            } else {
              this.stationNameMessage = 'Name "' + this.stationName + '" is free';
              this.station.name = this.stationName;
              this.freeNameStatus = true;
            }
          } else {
            this.stationNameMessage = 'Please enter station name';
            this.freeNameStatus = false;
            this.newSchedulesStatus = false;
          }
        }
      })
    },
  },

}
</script>