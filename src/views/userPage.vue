<template>
  <v-app>
    <v-container>
      <h2 align="center">Hello, passenger {{nameUser}} !</h2>
      <hr>
      <br>

    </v-container>
    <v-tabs fixed-tabs>
      <v-tab>
        train search and buy ticket
      </v-tab>
      <v-tab>
        schedule stations
      </v-tab>
      <v-tab-item>
        <trainSearch />
      </v-tab-item>
      <v-tab-item>
        <ScheduleStation />
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import trainSearch from '../components/userComponents/trainSearch1'
import ScheduleStation from "../components/userComponents/ScheduleStation";
import Cookies from 'js-cookie';

export default {
  data: () => ({
    sessionUsers: {},
    nameUser: '',
    url: {
      getLastUser: 'http://localhost:8090/api/v1/users/get-last',
      getNameUser: 'http://localhost:8090/api/v1/users/get-name',
    }
  }),
  components:{
    trainSearch,
    ScheduleStation
  },
  created() {
    this.axios.get(this.url.getNameUser, {params: { login : Cookies.get('Login') }})
        .then(response => {
          this.nameUser = response.data;
          console.log(this.nameUser)
        });
  },

}
</script>
