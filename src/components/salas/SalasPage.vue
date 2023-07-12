<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row align="center">
                    <v-col cols="auto">
                        <v-btn icon color="black" @click="toggleFilter">
                            <v-icon large>{{ showFilter ? 'mdi-filter-off' : 'mdi-filter' }}</v-icon>
                        </v-btn>
                    </v-col>
                    <v-row v-if="showFilter">
                        <v-checkbox
                            class="ml-3"
                            v-model="checkbox[index]"
                            v-for="(filter, index) in filters"
                            :key="index"
                        >
                            <template v-slot:label>
                                <div>{{ filter.type }}</div>
                            </template>
                        </v-checkbox>
                    </v-row>
                </v-row>
                <v-row justify="center" class="mt-10">
                    <v-col class="text-center" cols="12">
                        <v-btn
                            class="ml-6"
                            outlined
                            rounded
                            v-for="(day, index) in semana"
                            :key="index"
                        >
                            {{ day.name }}
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center" class="mt-10">
                    <v-col class="text-center" cols="12">
                        <v-btn
                            class="ml-6"
                            outlined
                            rounded
                            v-for="(horario, index) in turnos"
                            :key="index"
                            @click="changeTurno(horario.name)"
                            :class="{ 'active': turno === horario.name }"
                        >
                            {{ horario.name }}
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center" v-for="(predio, index) in predios" :key="index">
                    <v-col cols="12">
                        {{ predio.predio }}
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
                                <tr v-for="(sala, index) in predio.salas" :key="index">
                                    <td>{{ sala.sala }}</td>
                                    <td>{{ sala.turma1 }}</td>
                                    <td>{{ sala.turma2 }}</td>
                                    <td>{{ sala.turma3 }}</td>
                                    <td>{{ sala.turma4 }}</td>
                                    <td>{{ sala.turma5 }}</td>
                                    <td>{{ sala.tipo }}</td>
                                    <td>{{ sala.capac }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn fab fixed right bottom color="primary" x-large >
<!--                @click="Gerar"-->
                <v-icon>mdi-calendar-edit</v-icon>
            </v-btn>
        </v-main>
    </v-app>
</template>

<script>
// import axios from "axios";


export default {
    name: "SalasPage",
    data() {
        return {
            showFilter: false,
            turno: 'Manhã',
            turnos: [
                { name: "Manhã" },
                { name: "Tarde" }
            ],
            semana: [
                { name: "Segunda" },
                { name: "Terça" },
                { name: "Quarta" },
                { name: "Quinta" },
                { name: "Sexta" },
            ],
            checkbox: [],
            filters: [
                { type: "Laboratório" },
                { type: "Sala de aula" },
                { type: "Prédio A" },
                { type: "Prédio B" },
                { type: "Prédio C" },
                { type: "Prédio D" },
                { type: "Prédio E" },
            ],
            predios: [
                {
                    predio: 'Prédio A',
                    Manhã: ['7:30', '8:20', '9:10', '10:15', '11:00'],
                    Tarde: ['13:00', '13:50', '14:40', '15:45', '16:30'],
                    salas: [
                        {
                            sala: '201',
                            turma1: '63B',
                            turma2: '63B',
                            turma3: '63B',
                            turma4: '63B',
                            turma5: '63B',
                            tipo: 'lab',
                            capac: '20',
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        toggleFilter() {
            this.showFilter = !this.showFilter;
        },
        changeTurno(horario){
            this.turno = horario;
        },
        // gerar() {
        //     axios.get("").then(response =>{
        //         const grade = response.data;
        //         this.salas = grade.map(sala => ({
        //             predio: sala.predio,
        //             infos: [
        //                 {
        //                     sala: sala.sala,
        //                     turma1: sala.turma1,
        //                     turma2: sala.turma2,
        //                     turma3: sala.turma3,
        //                     turma4: sala.turma4,
        //                     turma5: sala.turma5,
        //                     tipo: sala.tipo,
        //                     capac: sala.capac,
        //                 },
        //             ],
        //         }));
        //     });
        // }
    }
}
</script>

<style scoped>
.active {
    background-color: #101FD0;
    color: white;
}
</style>
