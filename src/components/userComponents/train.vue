<template>
  <div>
    <v-card outlined color="blue-grey lighten-5" v-if="train!=null">
      <v-container height="50px">
        <v-row justify="center">
          <br>
          <v-col cols="12" sm="3">
            <p class="text-xl-right">Train № {{ train.number }} </p>
          </v-col>
          <v-col cols="12" sm="6">
            <p class="text-xl-right">capacity: {{ train.capacity }} </p>
          </v-col>

          <v-col cols="12" sm="2" v-if="ticketCheck == 0">
            <v-btn type="button" @click="buyTicket">buy ticket</v-btn>
          </v-col>
          <v-col cols="12" sm="2" v-else-if="ticketCheck == 1">
            <p> Нет свободных мест </p>
          </v-col>
          <v-col cols="12" sm="2" v-else-if="ticketCheck == 2">
            <p> Вы уже купили данный билет </p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <br>
  </div>
</template>
<script>
export default {
  data: () => ({
    ticketCheck: 0,
    fl: 1,
    ticket: {
      user: {},
      train: {},
    },
    url: {
      addTicket: 'http://localhost:8090/addTicket',
      updateTrain: 'http://localhost:8090/updateTrain',
      ticketUserCheck: 'http://localhost:8090/ticketUserCheck',
      getLastUser: 'http://localhost:8090/getLastUser'
    }
  }),
  props: {
    train: {
      type: Object,
      required: true
    },

  },
  watch: {
    fl() {
      this.axios.get(this.url.getLastUser)
          .then(response => {
            this.ticket.user = response.data;
            this.ticket.train = this.train;
            this.axios.post(this.url.ticketUserCheck, this.ticket)
                .then(response => {
                  this.ticketCheck = response.data;
                });
          });

    },
  },
  created() {
    this.fl++;
  },
  methods: {
    buyTicket() {
      this.train.capacity--;
      this.axios.post(this.url.updateTrain, this.train)
          .then(response => {
            response.data = null;
          });
      this.axios.post(this.url.addTicket, this.ticket)
          .then(response => {
            this.fl++;
            console.log('ticket который создали', response.data);
          });

    }
  }
}
</script>

<style>
/*.div1 {*/
/*  display: inline-block;*/
/*}*/
</style>