<template>
  <v-app id="inspire">
    <v-container>
      <h2 align="center">Hello, admin {{nameUser}} !</h2>
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
import Cookies from "js-cookie";

export default {
  components:{
    allTrain,
    allPassengerInTrain,
    newTrain,
    newStation
  },
  data() {
    return {
      nameUser: '',
      // stationName:'',
      // schedules:{},
      // allStation: [],
      url: {
        // allstation: 'http://localhost:8090/api/v1/stations',
        // addstation: 'http://localhost:8090/api/v1/stations',
        checkAuthority: 'http://localhost:8090/api/v1/users/check-authority',
        getNameUser: 'http://localhost:8090/api/v1/users/get-name',
      }
    }
  },
  created() {
    this.axios.get(this.url.checkAuthority);
    this.axios.get(this.url.getNameUser, {params: { login : Cookies.get('Login') }})
            .then(response => {
              this.nameUser = response.data;
              console.log(this.nameUser)
            });
  },
  // methods: {
    // getAllStation() {
    //   this.axios.get(this.url.allstation)
    //       .then(response => this.allStation = response.data);
    // },
    // addStation() {
    //   this.axios.post(this.url.addstation, this.stationName)
    //       .then(response => {this.$emit('allStation', response.data);
    //       })
    // }
  // }
}
</script>
<style>

</style>
