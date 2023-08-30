<template>
    <v-container>
        <v-row justify="center" v-for="(predio, index) in Predios" :key="index">
            <v-col cols="12">
                {{ predioName }}
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th>Sala</th>
                            <th v-for="(horario, index) in predio[turno]" :key="index">
                                {{ horario }}
                            </th>
                            <th>Tipo</th>
                            <th>Capac</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sala, index) in predio[day][0].Salas" :key="index">
                                <td>{{ sala.sala }}</td>
                                <td>{{ sala['turma1'] }}</td>
                                <td>{{ sala['turma2'] }}</td>
                                <td>{{ sala['turma3'] }}</td>
                                <td>{{ sala['turma4'] }}</td>
                                <td>{{ sala['turma5'] }}</td>
                                <td>{{ sala.tipo }}</td>
                                <td>{{ sala.capac }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    name: "TabelaSalas",
    data(){
        return{
            Predios: [
                {
                    Manhã: ['07:30', '08:20', '09:10', '10:15', '11:00'],
                    Tarde: ['13:00', '13:50', '14:40', '15:45', '16:30'],
                    Segunda:[
                        {Salas: [
                                {
                                    sala: '201',
                                    turma1: '63AB',
                                    turma2: '63AB',
                                    turma3: '82 2',
                                    turma4: '82 2',
                                    turma5: '82 2',
                                    tipo: 'Sala de aula',
                                    capac: '40',
                                },
                                {
                                    sala: '202',
                                    turma1: '63A',
                                    turma2: '63A',
                                    turma3: '63A',
                                    turma4: '63A',
                                    turma5: '63A',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                                {
                                    sala: '203',
                                    turma1: '63B',
                                    turma2: '63B',
                                    turma3: '63B',
                                    turma4: '63B',
                                    turma5: '63B',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                            ]}
                    ],
                    Terça :[
                        {Salas:[
                                {
                                    sala: '101',
                                    turma1: '61 1',
                                    turma2: '61 1',
                                    turma3: '83',
                                    turma4: '83',
                                    turma5: '83',
                                    tipo: 'Sala de aula',
                                    capac: '40',
                                },
                                {
                                    sala: '202',
                                    turma1: '63B',
                                    turma2: '63B',
                                    turma3: '63B',
                                    turma4: '63B',
                                    turma5: '63B',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                                {
                                    sala: '203',
                                    turma1: '62 2',
                                    turma2: '62 2',
                                    turma3: '62 2',
                                    turma4: '62 2',
                                    turma5: '62 2',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                            ]}
                    ],
                    Quarta :[
                        {Salas:[
                                {
                                    sala: '201',
                                    turma1: '63AB',
                                    turma2: '63AB',
                                    turma3: '82 2',
                                    turma4: '82 2',
                                    turma5: '82 2',
                                    tipo: 'Sala de aula',
                                    capac: '40',
                                },
                                {
                                    sala: '202',
                                    turma1: '63A',
                                    turma2: '63A',
                                    turma3: '63A',
                                    turma4: '63A',
                                    turma5: '63A',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                                {
                                    sala: '203',
                                    turma1: '63B',
                                    turma2: '63B',
                                    turma3: '63B',
                                    turma4: '63B',
                                    turma5: '63B',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                            ]}
                    ],
                    Quinta :[
                        {Salas:[
                                {
                                    sala: '101',
                                    turma1: '61 1',
                                    turma2: '61 1',
                                    turma3: '83',
                                    turma4: '83',
                                    turma5: '83',
                                    tipo: 'Sala de aula',
                                    capac: '40',
                                },
                                {
                                    sala: '202',
                                    turma1: '63B',
                                    turma2: '63B',
                                    turma3: '63B',
                                    turma4: '63B',
                                    turma5: '63B',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                                {
                                    sala: '203',
                                    turma1: '62 2',
                                    turma2: '62 2',
                                    turma3: '62 2',
                                    turma4: '62 2',
                                    turma5: '62 2',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                            ]}
                    ],
                    Sexta :[
                        {Salas:[
                                {
                                    sala: '201',
                                    turma1: '63',
                                    turma2: '63',
                                    turma3: '81 2',
                                    turma4: '81 2',
                                    turma5: '81 2',
                                    tipo: 'Sala de aula',
                                    capac: '40',
                                },
                                {
                                    sala: '202',
                                    turma1: '63B',
                                    turma2: '63B',
                                    turma3: '63B',
                                    turma4: '63B',
                                    turma5: '63B',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                                {
                                    sala: '203',
                                    turma1: '63A',
                                    turma2: '63A',
                                    turma3: '63A',
                                    turma4: '63A',
                                    turma5: '63A',
                                    tipo: 'Lab',
                                    capac: '20',
                                },
                            ]}
                    ],
                },
            ],
            grade: null,
        }
    },
    created() {
        axios
            .get(`http://localhost:3000/salas/grade/dia/${this.day}/${this.turno}`)
            .then(response => {
                this.grade = response;
                console.log(response.data);
            })
    },
    props:{
        predioName: String,
    },
    watch: {
        '$store.state.turno'(newValue) {
            this.turno = newValue;
        },
        '$store.state.day'(newValue){
            this.day = newValue;
        }
    },
    computed: {
        turno() {
            return this.$store.state.turno;
        },
        day(){
            return this.$store.state.day;
        }
    },
}
</script>

<style scoped>

</style>