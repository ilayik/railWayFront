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
                                        <v-text-field v-model="firstName" label="Legal first name"
                                                      autocomplete="off"></v-text-field>
                                        <div style="color:red">{{this.eFirstName}}</div>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="lastName" label="Legal last name"
                                                      autocomplete="off"></v-text-field>
                                        <div style="color:red">{{this.eLastName}}</div>
                                    </v-col>

                                    <v-col class="d-flex" cols="12" sm="6" >
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
                                            <v-date-picker v-model="date" no-title
                                                           @input="menu1 = false"></v-date-picker>
                                        </v-menu>
                                        <div style="color:red">{{this.eDateBirth}}</div>
                                    </v-col>


                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="email" label="Email"></v-text-field>
                                        <div style="color:red">{{this.eEmail}}</div>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field v-model="login" label="Login*"></v-text-field>
                                        <div style="color:red">{{this.eLogin}}</div>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="password"
                                                      label="Password*"
                                                      type="password"
                                                      required>
                                        </v-text-field>
                                        <div style="color:red">{{this.ePassword}}</div>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="confirmPassword"
                                                      label="Confirm Password*"
                                                      type="password"
                                                      required>
                                        </v-text-field>
                                        <div style="color:red">{{this.eConfirmPassword}}</div>
                                    </v-col>

                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <!--              <form v-if="freeUserNameStatus&&confirmPasswordStatus" @submit.prevent="saveUser">-->
                            <form @submit.prevent="saveUser">
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
            dialog: false,

            firstName: '',
            lastName: '',
            email: '',
            dateBirth: vm.formatDate(new Date().toISOString().substr(0, 10)),
            date: new Date().toISOString().substr(0, 10),

            login: '',
            password: '',
            confirmPassword: '',

            userDTO: {},

            eFirstName: '',
            eLastName: '',
            eEmail: '',
            eDateBirth: '',
            eLogin: '',
            ePassword: '',
            eConfirmPassword: '',

            url: {
                saveUser: 'http://localhost:8090/api/v1/users',
                validLogin: 'http://localhost:8090/api/v1/users/valid-login',
            },
        }),
        watch: {
            dialog() {
                console.log(this.date);
                console.log(this.dateBirth);
                this.login = '';
                this.confirmPassword = '';
                this.userDTO = {}
                this.password = '';
                this.firstName = '';
                this.lastName = '';
                this.email = '';
            },

        },
        methods: {
            validDateBirth(){
                var a = new Date()
                var b = new Date(this.date)
                var diff = Math.abs(a - b )
                var days = parseInt(diff/1000/60/60/24);
                if(a < b){
                    this.check = false;
                    return "You haven't been born yet"
                }else if(days < 7){
                    this.check = false;
                    return 'You must be over 7 days old'
                }
            },
            validConfirmPassword() {
                if ((this.confirmPassword !== this.password) || (this.confirmPassword === '')) {
                    this.check = false;
                    return "Passwords don't match";
                }
            },
            clear() {
                this.eFirstName = '';
                this.eLastName = '';
                this.eEmail = '';
                this.eDateBirth = '';
                this.eLogin = '';
                this.ePassword = '';
                this.eConfirmPassword = '';
            }
            ,
            formatDate(date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${day}.${month}.${year}`
            },
            validFirstName() {
                if (!this.firstName) {
                    this.check = false;
                    return 'Please enter your first name';
                }
                if (this.firstName.split('').length > 50) {
                    this.check = false;
                    return 'First name must be less than 50 characters'
                }
                if (this.firstName.split('').length < 2) {
                    console.log('this.firstName.split().length = ', this.firstName.split().length);
                    this.check = false;
                    return 'First name must be more than 2 characters'
                }
                return '';
            }
            ,
            validLastName() {
                if (!this.lastName) {
                    this.check = false;
                    return 'Please enter your first name'
                }
                if (this.lastName.split('').length > 50) {
                    this.check = false;
                    return 'Last name must be less than 50 characters'
                }
                if (this.lastName.split('').length < 2) {
                    this.check = false;
                    return 'Last name must be more than 2 characters'
                }
            }
            ,
            validEmail() {
                if (!this.email) {
                    this.check = false;
                    return 'Please enter your email'
                }
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(this.email)) {
                    this.check = false;
                    return 'Please enter correct email';
                }
            }
            ,
            validPassword() {
                if (!this.password) {
                    this.check = false;
                    return 'Please enter your password'
                }
                if (this.password.split('').length > 100) {
                    this.check = false;
                    return 'Password must be less than 100 characters'
                }
                if (this.password.split('').length < 3) {
                    this.check = false;
                    return 'Password must be more than 3 characters'
                }
            }
            ,
            validLogin() {
                this.axios.get(this.url.validLogin, {params: {login: this.login}})
                    .then(response => {
                        console.log(response.data);
                        if (response.data !== "") {
                            this.check = false;
                        }
                        this.eLogin = response.data;
                        return response.data;
                    })
            }
            ,
            validation() {
                this.eConfirmPassword =this.validConfirmPassword();
                this.eFirstName = this.validFirstName();
                this.eLastName = this.validLastName();
                this.eEmail = this.validEmail();
                this.ePassword = this.validPassword();
                this.eLogin = this.validLogin();
                this.eDateBirth = this.validDateBirth();
            }
            ,
            buildUser() {
                this.userDTO.login = this.login;
                this.userDTO.password = this.password;
                this.userDTO.email = this.email;
                this.userDTO.lastName = this.lastName;
                this.userDTO.firstName = this.firstName;
            }
            ,
            saveUser() {
                this.clear();
                this.validation();
                if (this.check) {
                    this.check = true;
                    this.buildUser();
                    this.axios.post(this.url.saveUser, this.userDTO)
                        .then(response => {
                            console.log(response);
                            this.$emit('user', response.data);
                            this.dialog = false;
                        })
                } else this.check = true;
            }
        }
    }
</script>