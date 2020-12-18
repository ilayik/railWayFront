<template>
  <div>
    <v-app id="inspire">
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"> Registration</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <br>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="firstName" label="Legal first name" hint=""
                                  autocomplete="off"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="lastName" label="Legal last name" autocomplete="off"></v-text-field>
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
                            v-model="dateBirth"
                            label="Date of birth"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="freeUserName" label="Login*" :hint="freeUserNameMessage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.password" label="Password*" type="password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="confirmPassword" label="Confirm Password*" type="password" required
                                  :hint="confirmPasswordMessage"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <form v-if="freeUserNameStatus&&confirmPasswordStatus" @submit.prevent="saveUser">
                <v-btn type="submit">Save</v-btn>
              </form>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
export default {
  data: vm => ({
    check: true,
    menu1: false,
    firstName: '',
    lastName: '',
    date: new Date().toISOString().substr(0, 10),
    dateBirth: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dialog: false,
    freeUserName: '',
    freeUserNameMessage: '',
    freeUserNameStatus: true,
    confirmPassword: '',
    confirmPasswordStatus: false,
    confirmPasswordMessage: '',
    user: {},
    allUsers: [],
    url: {
      allUser: 'http://localhost:8090/allUser',
      saveUser: 'http://localhost:8090/saveUser',
    },
  }),
  watch: {
    firstName() {
      this.user.firstName = this.firstName
    },
    lastName() {
      this.user.lastName = this.lastName
    },
    dateBirth() {
      this.user.dateBirth = this.dateBirth
    },
    date() {
      this.dateBirth = this.formatDate(this.date)
    },
    dialog() {
      this.freeUserName = '';
      this.freeUserNameMessage = '';
      this.freeUserNameStatus = true;
      this.confirmPassword = '';
      this.confirmPasswordStatus = false;
      this.confirmPasswordMessage = '';
      this.user = {}
      this.user.password = '';
      this.firstName = '';
      this.lastName = '';
    },
    freeUserName: function () {
      this.check = true;
      this.allUsers.forEach(user => {
        if (this.check) {
          if (this.freeUserName !== '') {
            if (this.freeUserName !== user.username) {
              this.freeUserNameMessage = 'Login "' + this.freeUserName + '" is free';
              this.user.username = this.freeUserName;
              this.freeUserNameStatus = true;
            } else {
              this.freeUserNameMessage = 'Login "' + this.user.username + '" is used';
              this.freeUserNameStatus = false;
              this.check = false;
            }
          } else {
            this.freeUserNameMessage = 'Please enter your login';
            this.freeUserNameStatus = false;
          }
        }
      })
    },
    confirmPassword: function () {
      if ((this.confirmPassword !== this.user.password) || (this.freeUserName === '')) {
        this.confirmPasswordMessage = "Passwords don't match";
        this.confirmPasswordStatus = false;
      } else {
        this.confirmPasswordMessage = "";
        this.confirmPasswordStatus = true;
      }
    },
  },
  // created() {
  //   this.getAllUser();
  // },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${year}-${month}-${day}`
    },
    getAllUser() {
      this.axios.get(this.url.allUser)
          .then(response => this.allUsers = response.data);
    },
    saveUser() {
      this.axios.post(this.url.saveUser, this.user)
          .then(response => {
            console.log(this.user);
            this.$emit('user', response.data);
            this.dialog = false;
          })
    }
  }
}
</script>