<template>
    <v-dialog
        v-model="this.$store.state.pdfDialog"
        persistent
        width="50vw"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title class="mb-2">
                <h3 class="headline mb-0">Gerar PDF</h3>
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
                    />
                </div>
            </v-card-text>
            <v-card-actions>
                <div v-if="turma">
                    <v-btn text @click="download">Baixar</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import jsPDF from 'jspdf';
import axios from 'axios';
import 'jspdf-autotable';

export default {
    name: 'PdfDialog',
    data() {
        return {
            infos: [],
            itemsTurma: [],
            filter: [],
            turma: null,
        };
    },
    methods: {
        download() {
            axios
                .get(`https://api-cimol.onrender.com/salas/grade/`)
                .then((response) => {
                    this.infos = response.data
                        .filter((element) => element.Turma === this.turma)
                        .map((element) => [
                            element.Dia,
                            element.turno,
                            element.Predio,
                            element.Sala,
                            element.Turma,
                            element.Disciplina,
                            element.Horario.slice(0, 5),
                        ]);
                })
                .then(() => {
                    let pdf = new jsPDF();
                    pdf.autoTable({
                        head: [
                            [
                                'Dia',
                                'Turno',
                                'Prédio',
                                'Sala',
                                'Turma',
                                'Disciplina',
                                'Período',
                            ],
                        ],
                        body: this.infos,
                    });
                    pdf.save(`Salas ${this.turma}.pdf`);
                });
        },
        close() {
            this.$store.commit('setPdfDialog', false);
            this.$emit('atualizar');
        },
    },
    created() {
        axios
            .get(`https://api-cimol.onrender.com/salas/grade/`)
            .then((response) => {
                response.data.forEach((element) => {
                    if (!this.itemsTurma.includes(element.Turma)) {
                        this.itemsTurma.push(element.Turma);
                    }
                });
            });
    },
};
</script>

<style scoped></style>
