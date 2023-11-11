<template>
    <v-main>
        <v-progress-linear
            :indeterminate="true"
            color="grey"
            height="7"
            fixed
            v-if="loading"
        />
        <v-container>
            <v-row class="d-flex justify-center mt-10">
                <v-col class="text-center" cols="12">
                    <v-btn
                        class="ml-6"
                        outlined
                        v-for="(selectedDay, index) in Week"
                        :key="index"
                        @click="changeDay(selectedDay)"
                        :class="{ active: day === selectedDay.name }"
                    >
                        {{ selectedDay.name }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center mt-10">
                <v-col class="text-center" cols="12">
                    <v-btn
                        class="ml-6"
                        outlined
                        v-for="(selectedTurno, index) in Turnos"
                        :key="index"
                        @click="changeTurno(selectedTurno)"
                        :class="{ active: turno === selectedTurno.name }"
                    >
                        {{ selectedTurno.name }}
                    </v-btn>
                </v-col>
            </v-row>
            <template v-if="showTable">
                <v-row
                    v-for="(predio, index) in Predio"
                    :key="index"
                    class="pa-2"
                >
                    <tabela-salas :predio-name="predio.name" />
                </v-row>
            </template>
            <div v-if="$store.state.editDialog">
                <component :is="dynamicComponent" @atualizar="refresh" />
            </div>
        </v-container>
        <v-btn fab fixed right bottom color="primary" x-large @click="gerar">
            <v-icon>mdi-calendar-edit</v-icon>
        </v-btn>
        <v-btn
            fab
            fixed
            right
            bottom
            color="primary"
            x-large
            @click="edit"
            class="btn-edit"
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
            fab
            fixed
            left
            bottom
            color="error"
            x-large
            class="alert"
            v-if="gradeNull"
            @click="showMissing"
        >
            <v-icon>mdi-alert</v-icon>
        </v-btn>
        <PdfButton/>
    </v-main>
</template>

<script>
import TabelaSalas from '@/components/tabela/TabelaSalas.vue';
import EditDialog from '@/components/edit/EditDialog.vue';
import PdfButton from '@/components/pdf/PdfButton.vue'
import axios from 'axios';

export default {
    name: 'SalasPage',
    components: { TabelaSalas, EditDialog, PdfButton },
    data() {
        return {
            turmasNull: [],
            gradeNull: false,
            showTable: true,
            dynamicComponentData: null,
            Predio: [
                { name: 'Prédio A' },
                { name: 'Prédio B' },
                { name: 'Prédio C' },
                { name: 'Prédio D' },
                { name: 'Prédio E' },
            ],
            Turnos: [{ name: 'Manhã' }, { name: 'Tarde' }],
            turno: 'Manhã',
            day: 'Segunda',
            Week: [
                { name: 'Segunda' },
                { name: 'Terça' },
                { name: 'Quarta' },
                { name: 'Quinta' },
                { name: 'Sexta' },
            ],
            loading: false,
        };
    },
    methods: {
        changeTurno(selectedTurno) {
            this.turno = selectedTurno.name;
            this.$store.commit('setTurno', selectedTurno.name);
            this.refresh();
        },
        changeDay(selectedDay) {
            this.day = selectedDay.name;
            this.$store.commit('setDay', selectedDay.name);
            this.refresh();
        },
        async gerar() {
            this.loading = true;
            try {
                await axios.post(
                    `https://api-cimol.onrender.com/salas/criar-grade?dia=${this.day}&turno=${this.turno}`
                );
                setTimeout(() => {
                    this.refresh();
                    this.loading = false;
                }, 1000);
            } catch (err) {
                console.log(err);
            }
        },
        edit() {
            this.$store.commit('setEditDialog', true);
        },
        refresh() {
            this.showTable = false;
            this.$nextTick(() => {
                this.showTable = true;
            });
        },
        verificar() {
            axios
                .get(
                    `https://api-cimol.onrender.com/salas/grade/?dia=${this.day}&turno=${this.turno}`
                )
                .then((response) => {
                    let vazio = false;
                    this.turmasNull = [];
                    let turmasExibidas = [];
                    response.data.forEach((element) => {
                        if (element.Sala == null) {
                            const turmaDisciplina = `${element.Turma}-${element.Disciplina}`;
                            if (!turmasExibidas.includes(turmaDisciplina)) {
                                this.turmasNull.push({
                                    turma: element.Turma,
                                    materia: element.Disciplina,
                                });
                                turmasExibidas.push(turmaDisciplina);
                            }
                            this.gradeNull = true;
                            vazio = true;
                        }
                    });
                    if (!vazio) {
                        this.gradeNull = false;
                    }
                });
        },
        showMissing() {
            this.$store.commit(
                'showErrorMessage',
                `${
                    'Turma(s) sem sala: ' +
                    this.turmasNull
                        .map((item) => item.turma + ' (' + item.materia + ')')
                        .join(', ')
                }`
            );
        },
    },
    computed: {
        dynamicComponent() {
            if (this.$store.state.editDialog) {
                return EditDialog;
            }
            return null;
        },
    },
    created() {
        this.intervalID = setInterval(this.verificar, 3000); //
    },
    beforeDestroy() {
        clearInterval(this.intervalID);
    },
};
</script>

<style scoped>
.active {
    background-color: #101fd0;
    color: white;
}
.btn-edit {
    margin-right: 5rem;
}
.alert {
    margin-left: 5rem;
}
</style>
