<template>
  <div >
    <v-app id="inspire">
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="4" >
            <v-text-field
                v-model="user.username"
                label="Username"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" >
            <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-card-text>{{qwe}}</v-card-text>
        </v-row>
      </v-container>
    </v-form>
    <form  @submit.prevent = "loginUser">
      <v-btn type="submit">Log in</v-btn>
    </form>
    <br>
      <RegistrationForm />
    <br>
    </v-app >
  </div>
</template>
<script>
import RegistrationForm from '@/components/loginComponents/RegistrarionForm';
export default {
  name: "LoginApp",
  data: () => ({
    qwe:'',
    user:{},
    allUsers:[],
    url: {
      allUser: 'http://localhost:8090/allUser',
      saveLastUser: 'http://localhost:8090/saveLastUser',
    },
    show1: false,
    show2: false,
  }),
  components:{
    RegistrationForm,
  },
  created() {
    this.axios.get(this.url.allUser)
        .then(response => this.allUsers = response.data);
  },
  methods:{
    loginUser(){
      this.allUsers.forEach(user => {
        if((this.user.username === user.username)&&(this.user.password === user.password)){
          this.axios.post(this.url.saveLastUser, user)
              .then(response =>
                console.log(response.data)
              );
          user.roles.forEach(role => {
            console.log(role.name);
            if(role.name === 'ROLE_ADMIN'){
              window.location.assign("http://localhost:8080/admin-page");
            }else if (role.name === 'ROLE_USER')
              window.location.assign("http://localhost:8080/user-page");
          })
        }else{this.qwe = 'There is no such user';}})
    },
  }
}
</script>
<style>
form {
  text-align: center;
}
</style>
