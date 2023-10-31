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
                    <tabela-salas :predio-name="predio.name"/>
                </v-row>
            </template>
        </v-container>
        <v-btn fab fixed right bottom color="primary" x-large @click="gerar">
            <v-icon>mdi-calendar-edit</v-icon>
        </v-btn>
    </v-main>
</template>

<script>
import TabelaSalas from '@/components/tabela/TabelaSalas.vue';
import axios from 'axios';

export default {
    name: 'SalasPage',
    components: { TabelaSalas },
    data() {
        return {
            showTable: false,
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
            if (this.showTable == true) {
                this.showTable = false;
                this.gerar();
            }
        },
        changeDay(selectedDay) {
            this.day = selectedDay.name;
            this.$store.commit('setDay', selectedDay.name);
            if (this.showTable == true) {
                this.showTable = false;
                this.gerar();
            }
        },
        async gerar() {
            try {
                await axios.post(
                    `http://localhost:3000/salas/criar-grade?dia=${this.day}&turno=${this.turno}`
                );
                this.showTable = true;
                
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style scoped>
.active {
    background-color: #101fd0;
    color: white;
}
</style>
