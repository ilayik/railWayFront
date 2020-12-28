<template>
  <div>
    <v-app id="inspire">
      <v-form>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="AuthenticationRequestDTO.login"
                  label="Username"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="AuthenticationRequestDTO.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-card-text>{{ qwe }}</v-card-text>
          </v-row>
        </v-container>
      </v-form>
      <form @submit.prevent="loginUser">
        <v-btn type="submit">Log in</v-btn>
      </form>
      <br>
      <RegistrationForm/>
      <br>
    </v-app>
  </div>
</template>
<script>
  import RegistrationForm from '../components/loginComponents/RegistrarionForm';
  import Cookies from 'js-cookie'
  import router from "../router";

  export default {
  name: "LoginApp",
  data: () => ({
    qwe: '',
    AuthenticationRequestDTO: {},
    allUsers: [],
    url: {
      allUser: 'http://localhost:8090/api/v1/users',
      saveLastUser: 'http://localhost:8090/api/v1/users/save-last',
      login: 'http://localhost:8090/api/v1/auth/login',
      users: 'http://localhost:8090/api/v1/users',
    },
    show1: false,
    show2: false,
  }),
  components: {
    RegistrationForm,

  },
  methods: {
    loginUser() {
      this.axios.post(this.url.login, this.AuthenticationRequestDTO)
          .then(response => {
                if (response.status === 200) {
                  Cookies.set('Token', response.data.token);
                  console.log('Токен выдан и записан в headers ', Cookies.get('Token'))
                  console.log(response.data.role);
                  if(response.data.role === 'ADMIN')
                    router.push('/admin-page');
                  if(response.data.role === 'USER')
                    router.push('/user-page');
                } else {
                  this.qwe = 'There is no such user';
                }
                console.log(response.data)
              }
          )
    },
  }
}
</script>
<style>
form {
  text-align: center;
}
</style>
