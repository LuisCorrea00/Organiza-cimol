<template>
    <v-main>
        <v-container>
            <v-row justify="center" class="mt-10">
                <v-col class="text-center" cols="12">
                    <v-btn
                        class="ml-6"
                        outlined
                        rounded
                        v-for="(selectedDay, index) in Week"
                        :key="index"
                        @click="changeDay(selectedDay)"
                        :class="{ active: day === selectedDay.name }"
                    >
                        {{ selectedDay.name }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="center" class="mt-10">
                <v-col class="text-center" cols="12">
                    <v-btn
                        class="ml-6"
                        outlined
                        rounded
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
            right
            bottom
            color="error"
            x-large
            class="alert"
            v-if="gradeNull"
            @click="showMissing"
        >
            <v-icon>mdi-alert</v-icon>
        </v-btn>
    </v-main>
</template>

<script>
import TabelaSalas from '@/components/tabela/TabelaSalas.vue';
import EditDialog from '@/components/edit/EditDialog.vue';
import axios from 'axios';

export default {
    name: 'SalasPage',
    components: { TabelaSalas, EditDialog },
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
            try{
                await axios.post(
                `http://localhost:3000/salas/criar-grade?dia=${this.day}&turno=${this.turno}`
                );
                this.refresh();
            } catch(err) {
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
                    `http://localhost:3000/salas/grade/?dia=${this.day}&turno=${this.turno}`
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
            alert(
                'Turmas sem sala: ' +
                    this.turmasNull
                        .map((item) => item.turma + ' (' + item.materia + ')')
                        .join(', ')
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
    margin-right: 10rem;
}
</style>
