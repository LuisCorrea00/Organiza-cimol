<template>
    <v-main>
        <v-container>
            <v-row align="center mt-5">
                <v-col cols="auto">
                    <v-btn icon color="black" @click="toggleFilter">
                        <v-icon large>{{ showFilter ? 'mdi-filter-off' : 'mdi-filter' }}</v-icon>
                    </v-btn>
                </v-col>
                <v-row v-if="showFilter">
                    <v-checkbox
                        class="ml-3"
                        v-model="checkbox[index]"
                        v-for="(filter, index) in Filters"
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
                        v-for="(selectedDay, index) in Week"
                        :key="index"
                        @click="changeDay(selectedDay); "
                        :class="{ 'active': day === selectedDay.name }"
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
                        @click="changeTurno(selectedTurno); "
                        :class="{ 'active': turno === selectedTurno.name }"
                    >
                        {{ selectedTurno.name }}
                    </v-btn>
                </v-col>
            </v-row>
            <template v-if="showTable">
                <v-row v-for="(predio, index) in Predio" :key="index" class="pa-2">
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
import TabelaSalas from "@/components/tabela/TabelaSalas.vue";
export default {
    name: "SalasPage",
    components: {TabelaSalas},
    data() {
        return {
            showFilter: false,
            showTable: false,
            Predio:[
                { name: "Prédio A" },
                { name: "Prédio B" },
                { name: "Prédio C" },
                { name: "Prédio D" },
                { name: "Prédio E" },
            ],
            Turnos: [
                { name: "Manhã" },
                { name: "Tarde" }
            ],
            turno:'Manhã',
            day:'Segunda',
            Week: [
                { name: "Segunda" },
                { name: "Terça" },
                { name: "Quarta" },
                { name: "Quinta" },
                { name: "Sexta" },
            ],
            checkbox: [],
            Filters: [
                { type: "Laboratório" },
                { type: "Sala de aula" },
                { type: "Prédio A" },
                { type: "Prédio B" },
                { type: "Prédio C" },
                { type: "Prédio D" },
                { type: "Prédio E" },
            ],
        };
    },
    methods: {
        toggleFilter() {
            this.showFilter = !this.showFilter;
        },
        changeTurno(selectedTurno) {
            this.turno = selectedTurno.name;
            this.$store.commit('setTurno', selectedTurno.name);
        },
        changeDay(selectedDay){
            this.day = selectedDay.name;
            this.$store.commit('setDay',selectedDay.name);
        },
        gerar(){
          this.showTable = true;
        },
    }
}
</script>

<style scoped>
.active {
    background-color: #101FD0;
    color: white;
}
</style>
