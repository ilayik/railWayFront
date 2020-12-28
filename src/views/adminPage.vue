<template>
<!--  <div >-->
<!--    <v-btn type="button" @click="addStation">добавить станцию</v-btn>-->
<!--    <v-btn type="button" @click="getAllStation">все станции</v-btn>-->
<!--    <v-text-field v-model="stationName" hide-details color="orange"></v-text-field>-->
<!--    <ul>-->
<!--      <li v-for="(station, id) in allStation" :key="id">{{station}}</li>-->
<!--    </ul>-->
<!--  </div>-->
  <v-app id="inspire">
    <v-container>
      <h2 align="center">Hello, admin {{sessionUsers.username}} !</h2>
      <hr>
      <br>

    </v-container>
    <v-tabs fixed-tabs>
      <v-tab>
        new station
      </v-tab>
      <v-tab>
        new train
      </v-tab>
      <v-tab>
        all passenger in train
      </v-tab>
      <v-tab>
        all train
      </v-tab>
      <v-tab-item>
        <newStation/>
      </v-tab-item>
      <v-tab-item>
        <newTrain />
      </v-tab-item>
      <v-tab-item>
        <allPassengerInTrain />
      </v-tab-item>
      <v-tab-item>
        <allTrain />
      </v-tab-item>
    </v-tabs>

  </v-app>
</template>

<script>
import allTrain from "../components/adminComponents/allTrain";
import allPassengerInTrain from "../components/adminComponents/allPassengerInTrain";
import newTrain from "../components/adminComponents/newTrain";
import newStation from "../components/adminComponents/newStation";

export default {
  components:{
    allTrain,
    allPassengerInTrain,
    newTrain,
    newStation
  },
  data() {
    return {
      sessionUsers: {},
      stationName:'',
      schedules:{},
      allStation: [],
      url: {
        getLastUser: 'http://localhost:8090/getLastUser',
        allstation: 'http://localhost:8090/api/v1/stations',
        addstation: 'http://localhost:8090/api/v1/stations'
      }
    }
  },
  created() {
    this.axios.get(this.url.getLastUser)
        .then(response => {
          this.sessionUsers = response.data;
        });
  },
  methods: {
    getAllStation() {
      this.axios.get(this.url.allstation)
          .then(response => this.allStation = response.data);
    },
    addStation() {
      this.axios.post(this.url.addstation, this.stationName)
          .then(response => {this.$emit('allStation', response.data);
          })
    }
  }
}
</script>
<style>

</style>
