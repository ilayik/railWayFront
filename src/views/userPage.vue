<template>
  <v-app>
    <v-container>
      <h2 align="center">Hello, passenger {{sessionUsers.username}} !</h2>
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
import trainSearch from '@/components/userComponents/trainSearch1'
import ScheduleStation from "@/components/userComponents/ScheduleStation";

export default {
  data: () => ({
    sessionUsers: {},
    url: {
      getLastUser: 'http://localhost:8090/getLastUser'
    }
  }),
  components:{
    trainSearch,
    ScheduleStation

  },
  created() {
    this.axios.get(this.url.getLastUser)
        .then(response => {
          this.sessionUsers = response.data;
        });
  },

}
</script>
