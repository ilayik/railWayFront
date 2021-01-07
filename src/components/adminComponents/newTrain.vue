<template>
    <div>

        <br>
        <v-container>
            <v-row justify="center">
                <v-col cols="12">
                    <p align="center"> Please enter the train number and capacity </p>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                    <v-text-field v-model="trainNumber" label="Train number" :hint="trainNumberMessage"
                                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                    <v-text-field v-model="trainCapacity" label="Train capacity" :hint="trainCapacityMessage"
                                  required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <form v-if="freeNumberStatus" @submit.prevent="saveTrain">
                        <v-btn type="submit">Save Train</v-btn>
                    </form>
                    <p align="center">{{ trainCreateMassage }}</p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({

            trainCreateMassage: '',
            trainNumberMessage: '',
            trainCapacityMessage: '',

            trainNumber: '',
            trainCapacity: '',

            check: true,
            freeNumberStatus: false,

            allTrains: [],
            train: {
                number: '',
                capacity: '',
            },
            url: {
                allTrain: 'http://localhost:8090/api/v1/trains',
                saveTrain: 'http://localhost:8090/api/v1/trains'
            },
        }),
        watch: {
            trainNumber() {
                this.check = true;
                this.allTrains.forEach(train => {
                    if (this.check) {
                        if (this.trainNumber !== '') {
                            if (this.trainNumber === train.number) {
                                this.trainNumberMessage = 'Number "' + this.trainNumber + '" is used';
                                this.freeNumberStatus = false;
                                this.check = false;
                            } else {
                                this.trainNumberMessage = 'Login "' + this.trainNumber + '" is free';
                                this.train.number = this.trainNumber;
                                this.freeNumberStatus = true;
                                this.getAllTrains();
                            }
                        } else {
                            this.trainNumberMessage = 'Please enter train number';
                            this.freeNumberStatus = false;
                        }
                    }
                })
            },
            trainCapacity() {
                this.check = true;
                if (this.trainCapacity !== '') {
                    if (isNaN(this.trainCapacity))
                        this.trainCapacityMessage = this.trainCapacity + ' is not a number';
                    else{ if (this.trainCapacity < 0)
                        this.trainCapacityMessage = 'Train capacity must be greater than 0';
                    else this.trainCapacityMessage = '';
                    }
                } else this.trainCapacityMessage = 'Please enter train capacity';
            },
        },
        created() {
            this.getAllTrains();
        },
        methods: {
            getAllTrains() {
                this.axios.get(this.url.allTrain)
                    .then(
                        response => {
                            this.allTrains = response.data;
                        }
                    )
            },
            saveTrain() {
                this.axios.post(this.url.saveTrain, this.train)
                    .then(
                        response => {
                            this.trainNumber = '';
                            this.train.capacity = '';
                            this.trainCreateMassage = 'Train № ' + response.data.number + ' saved';
                        }
                    )
            }
        }
    }
</script>

<style scoped>

</style>