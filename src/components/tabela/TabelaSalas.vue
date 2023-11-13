<template>
    <v-container>
        <v-row>
            <span class="text-h5 font-weight-bold">{{ predioName }}</span>
            <v-col cols="12">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th
                                    class="text-body-1 black--text font-weight-medium"
                                >
                                    Sala
                                </th>
                                <th
                                    v-for="(horario, hIndex) in horarios[turno]"
                                    :key="hIndex"
                                    class="text-body-1 black--text font-weight-medium"
                                >
                                    {{ horario.slice(0, 5) }}
                                </th>

                                <th
                                    class="text-body-1 black--text font-weight-medium"
                                >
                                    Tipo
                                </th>
                                <th
                                    class="text-body-1 black--text font-weight-medium"
                                >
                                    Capacidade
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(sala, sIndex) in salas"
                                :key="sIndex"
                                class="black--text"
                            >
                                <td>{{ sala.nome }}</td>
                                <td
                                    v-for="(horario, hIndex) in horarios[turno]"
                                    :key="hIndex"
                                >
                                    <span
                                        v-for="(grade, gIndex) in gradePredio"
                                        :key="gIndex"
                                    >
                                        <span
                                            v-if="
                                                grade.Sala === sala.nome &&
                                                grade.Horario === horario
                                            "
                                        >
                                            {{ grade.Turma }} ({{
                                                grade.Disciplina
                                            }})
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
        axios.get('https://api-cimol.onrender.com/salas/').then((response) => {
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
                `https://api-cimol.onrender.com/salas/grade/?dia=${this.day}&turno=${this.turno}`
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
    methods: {
        close() {
            this.$store.commit('setEditDialog', false);
            this.turma = null;
            this.materia = null;
        },
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
