<template>
    <v-container>
        <v-row>
            {{ predioName }}
            <v-col cols="12">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Sala</th>
                                <th
                                    v-for="(horario, hIndex) in horarios[turno]"
                                    :key="hIndex"
                                >
                                    {{ horario }}
                                </th>
                                <th>Tipo</th>
                                <th>Capac</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sala, sIndex) in salas" :key="sIndex">
                                <td>{{ sala.nome }}</td>
                                <td
                                    v-for="(horario, hIndex) in horarios[turno]"
                                    :key="hIndex"
                                >
                                    <span
                                        v-for="grade in gradePredio"
                                        :key="grade"
                                    >
                                        <span
                                            v-if="
                                                grade.Sala === sala.nome &&
                                                grade.Horario === horario
                                            "
                                        >
                                            {{ grade.Turma }} ({{ grade.Disciplina }})
                                        </span>
                                    </span>
                                </td>
                                <td>{{ sala.tipo }}</td>
                                <td>{{ sala.capacidade }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TabelaSalas',
    data() {
        return {
            gradePredio: [],
            horarios: {
                Manhã: [
                    '07:30:00',
                    '08:20:00',
                    '09:10:00',
                    '10:15:00',
                    '11:00:00',
                ],
                Tarde: [
                    '13:00:00',
                    '13:50:00',
                    '14:40:00',
                    '15:45:00',
                    '16:30:00',
                ],
            },
            salas: [],
            turno: this.$store.state.turno,
            day: this.$store.state.day,
        };
    },
    created() {
        axios.get('http://localhost:3000/salas/').then((response) => {
            response.data.forEach((element) => {
                if (
                    element.predio ==
                    this.predioName.charAt(this.predioName.length - 1)
                ) {
                    this.salas.push(element);
                }
            });
        });
        axios
            .get(
                `http://localhost:3000/salas/grade/?dia=${this.day}&turno=${this.turno}`
            )
            .then((response) => {
                response.data.forEach((element) => {
                    if (
                        element.Predio ==
                        this.predioName.charAt(this.predioName.length - 1)
                    ) {
                        this.gradePredio.push(element);
                    }
                });
            });
    },
    props: {
        predioName: String,
    },
    watch: {
        turno(newValue) {
            this.$store.commit('setTurno', newValue);
        },
        day(newValue) {
            this.$store.commit('setDay', newValue);
        },
    },
};
</script>

<style scoped></style>
