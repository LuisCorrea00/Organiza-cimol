<template>
    <v-dialog v-model="this.$store.state.editDialog" width="60vw" persistent>
        <v-card>
            <v-card-title class="mb-2">
                <v-progress-linear v-model="steps" class="mb-3" />
                <span>{{ this.day }} de {{ this.turno }}</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="close">
                    <v-icon color="black">mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div>
                    <span>Turma:</span>
                    <v-autocomplete
                        clearable
                        filled
                        :items="itemsTurma"
                        v-model="turma"
                    >
                    </v-autocomplete>
                    <div v-if="turma">
                        <span>Disciplina:</span>
                        <v-autocomplete
                            clearable
                            filled
                            :items="filteredItemsDisciplina"
                            v-model="materia"
                        >
                        </v-autocomplete>
                    </div>
                    <div v-if="turma && materia && showSalas">
                        <span>Sala:</span>
                        <v-autocomplete
                            clearable
                            filled
                            :items="filteredItemsSalas"
                            v-model="sala"
                        >
                        </v-autocomplete>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <div v-if="turma && materia && showOptions">
                    <v-btn text @click="limpar" :loading="loading" class="mr-2">
                        Desocupar
                    </v-btn>
                    <v-btn
                        text
                        @click="(showSalas = true), (showOptions = false)"
                    >
                        Alterar
                    </v-btn>
                </div>
                <div v-if="turma && materia && sala">
                    <v-btn text @click="update" :loading="loading">
                        Salvar
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditDialog',
    data() {
        return {
            turno: this.$store.state.turno,
            day: this.$store.state.day,
            itemsTurma: [],
            grade: [],
            ambDisciplina: [],
            ambSalas: [],
            turma: null,
            materia: null,
            sala: null,
            showSalas: false,
            showOptions: true,
            steps: 0,
            loading: false,
        };
    },
    methods: {
        close() {
            this.$store.commit('setEditDialog', false);
            this.$emit('atualizar');
        },
        update() {
            this.loading = true;
            axios
                .post('https://api-cimol.onrender.com/salas/update', {
                    disc: this.materia,
                    turma: this.turma,
                    dia: this.day,
                    turno: this.turno,
                    sala: this.sala,
                })
                .then((response) => {
                    setTimeout(() => {
                        if (response.data != 'OK') {
                            this.loading = false;
                            this.$store.commit(
                                'showErrorMessage',
                                response.data
                            );
                        } else {
                            this.loading = false;
                            this.$store.commit(
                                'showSuccessMessage',
                                'Sala alterada com sucesso!'
                            );
                            this.close();
                        }
                    }, 1000);
                });
        },
        limpar() {
            this.loading = true;
            axios.post('https://api-cimol.onrender.com/salas/limpar', {
                disc: this.materia,
                turma: this.turma,
                dia: this.day,
                turno: this.turno,
            });
            setTimeout(() => {
                this.loading = false;
                this.$store.commit(
                    'showSuccessMessage',
                    'Sala desocupada com sucesso!'
                );
                this.close();
            }, 1000);
        },
    },
    watch: {
        turno(newValue) {
            this.$store.commit('setTurno', newValue);
        },
        day(newValue) {
            this.$store.commit('setDay', newValue);
        },
        turma(newValue) {
            if (newValue) {
                this.steps = 33;
            } else {
                this.steps = 0;
            }
        },
        materia(newValue) {
            if (newValue) {
                this.steps = 66;
            } else {
                this.steps = this.turma ? 33 : 0;
            }
        },
        sala(newValue) {
            if (newValue) {
                this.steps = 100;
            } else {
                this.steps = this.materia ? 66 : this.turma ? 33 : 0;
            }
        },
    },
    created() {
        axios.get('https://api-cimol.onrender.com/salas/').then((response) => {
            response.data.forEach((element) => {
                const salas = {
                    predio: element.predio,
                    nome: element.nome,
                    tipo: element.tipo,
                };
                this.ambSalas.push(salas);
            });
        });
        axios
            .get(
                `https://api-cimol.onrender.com/salas/grade/?dia=${this.day}&turno=${this.turno}`
            )
            .then((response) => {
                response.data.forEach((element) => {
                    this.itemsTurma.push(element.Turma);
                    const itemsGrade = {
                        Turma: element.Turma,
                        Disciplina: element.Disciplina,
                    };
                    this.grade.push(itemsGrade);
                });
            });
        axios
            .get(
                `https://api-cimol.onrender.com/horario/?dia=${this.day}&turno=${this.turno}`
            )
            .then((response) => {
                response.data.forEach((element) => {
                    const horario = {
                        Disciplina: element.Disciplina,
                        Ambiente: element.Ambiente,
                    };
                    this.ambDisciplina.push(horario);
                });
            });
    },
    computed: {
        filteredItemsDisciplina() {
            let horario = [];
            this.grade.forEach((element) => {
                if (element.Turma === this.turma) {
                    horario.push(element.Disciplina);
                }
            });
            return horario;
        },
        filteredItemsSalas() {
            let salas = [];
            this.ambDisciplina.forEach((horario) => {
                this.ambSalas.forEach((sala) => {
                    if (horario.Disciplina === this.materia) {
                        if (horario.Ambiente === sala.tipo) {
                            const salaComPredio = `${sala.predio} ${sala.nome}`;
                            salas.push(salaComPredio);
                        }
                    }
                });
            });
            return salas;
        },
    },
};
</script>

<style scoped></style>
