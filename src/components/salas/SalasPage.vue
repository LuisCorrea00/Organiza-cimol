<template>
  <v-app>
      <v-main>
          <v-container>
              <v-row align="center">
                  <v-col cols="auto">
                      <v-btn icon color="black" @click="toggleFilter">
                          <v-icon large> {{ showFilter ? 'mdi-filter-off' : 'mdi-filter' }} </v-icon>
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
                              <div>
                                  {{ filter.type }}
                              </div>
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
                          {{day.name}}
                      </v-btn>
                  </v-col>
              </v-row>
              <v-row justify="center" class="mt-10">
                  <v-col class="text-center" cols="12">
                      <v-btn
                          class="ml-6"
                          outlined
                          rounded
                          v-for="(turno, index) in turnos"
                          :key="index"
                      >
                          {{turno.name}}
                      </v-btn>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col>
                      
                  </v-col>
              </v-row>
          </v-container>
          <v-btn fab fixed right bottom color="primary" x-large @click="gerar">
              <v-icon>mdi-calendar-edit</v-icon>
          </v-btn>
      </v-main>
  </v-app>
</template>

<script>

export default {
    name: "SalasPage",
    data() {
        return {
            showFilter: false,
            turnos: [
                {name:"Manhã"},
                {name:"Tarde"}
            ],
            semana: [
                {name:"Segunda"},
                {name:"Terça"},
                {name:"Quarta"},
                {name:"Quinta"},
                {name:"Sexta"},
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
            grade: [
                {predio : 'api'},
                {sala: 'api'},
                {capac: 'api'},
                {manha: ['7:30', '8:20', '9:10', '10:15', '11:00']},
                {tarde: ['13:00', '13:50', '14:40', '15:45', '16:30']}
            ]
        };
    },
    methods:{
        toggleFilter(){
            this.showFilter = !this.showFilter;
        },
        gerar(){

        }
    }
}
</script>

<style scoped>

</style>