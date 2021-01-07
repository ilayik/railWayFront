<template>
  <div>
    <v-col cols="12" sm="12" md="12">
      <v-data-table
          :headers="headers"
          :items="schedules"
          sort-by="arrival"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>Schedules in {{stationname}} station</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  New Schedules
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline"> {{formTitle}} </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.trainNumber" label="Train number"></v-text-field>
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
                                v-model="dateFormat"
                                label="Arrival"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
      <template v-if="schedules.length !== 0">
        <v-btn
                color="primary"
                @click="saveSchedules"
        >
          save schedules
        </v-btn>
      </template>
    </v-col>
  </div>
</template>

<script>
export default {
  props: { stationname: String },
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormat: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dialog: false,
    dialogDelete: false,
    menu1: false,
    headers: [
      {text: 'Train number',value: 'number'},
      {text: 'Arrival', value: 'arrival'},
      {text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    defaultItem:{
      trainNumber: '',
      arrival: '',
      stationName: '',
    },
    editedItem: {
      trainNumber: '',
      arrival: '',
      stationName: '',
    },
    check: true,
    stationNameMessage: '',

    station: {
      name: '',
    },
    schedules: [],
    url: {
      allStation: 'http://localhost:8090/api/v1/stations',
      saveSchedules: 'http://localhost:8090/api/v1/schedules/add-in-station',
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Schedule' : 'Edit Schedule'
    },
  },
  created() {
    console.log('stationname  ' + this.stationname);
    this.getAllTrains();
  },

  methods: {
    getAllTrains() {
      // this.axios.get(this.url.alltrains)
      //     .then(response => {
      //       this.allTrains = response.data;
      //       console.log(this.allTrains)
      //     })
    },
    saveSchedules() {
      console.log(this.schedules)
      this.axios.post(this.url.saveSchedules, this.schedules)
              .then(response => {
                console.log(response)
              })
    },

    editItem(item) {
      this.editedIndex = this.schedules.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.schedules.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.schedules.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {

        this.editedItem.stationName = this.stationname;
        console.log(this.editedItem);
        Object.assign(this.schedules[this.editedIndex], this.editedItem)
      } else {
        this.editedItem.stationName = this.stationname;
        console.log(this.editedItem);
        this.schedules.push(this.editedItem)
      }
      console.log('log save')
      this.close()
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${year}-${month}-${day}`
    },
  },
  watch: {
    date () {
      this.dateFormat = this.formatDate(this.date);
      this.editedItem.arrival = this.dateFormat;
    },
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

}
</script>

<style scoped>

</style>