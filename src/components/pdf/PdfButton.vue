<template>
    <div>
        <v-btn @click="download" fab fixed left bottom x-large color="primary">
            <v-icon>mdi-file-pdf-box</v-icon>
        </v-btn>
    </div>
</template>

<script>
import jsPDF from 'jspdf';
import axios from 'axios';
import 'jspdf-autotable';

export default {
    name: 'PdfButton',
    data() {
        return {
            infos: [],
        };
    },
    methods: {
        download() {
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
            pdf.save(
                `Salas${this.$store.state.day}${this.$store.state.turno}.pdf`
            );
        },
        fetchData() {
            axios
                .get(
                    `https://api-cimol.onrender.com/salas/grade/?dia=${this.$store.state.day}&turno=${this.$store.state.turno}`
                )
                .then((response) => {
                    this.infos = response.data.map((element) => [
                        element.Dia,
                        element.turno,
                        element.Predio,
                        element.Sala,
                        element.Turma,
                        element.Disciplina,
                        element.Horario.slice(0, 5),
                    ]);
                });
        },
    },
    created() {
        this.fetchData();
    },
    watch: {
        '$store.state.turno': 'fetchData',
        '$store.state.day': 'fetchData',
    },
};
</script>

<style scoped></style>
