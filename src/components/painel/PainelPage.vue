<template>
  <v-app>
      <v-main>
          <v-container>
              <v-row justify="center">
                  <v-col class="text-h4 text-center font-weight-bold mb-10" cols="12">
                      PAINEL DE CONTROLE
                  </v-col>
                  <v-col lg="4" md="4" cols="12" class="pa-5" align-self="center">
                     <div class="float-left mr-3">
                         <a @click="goToHorarios">
                             <v-img src="@/assets/icon-grade.png" max-height="130" max-width="130"/>
                         </a>
                     </div>
                      <div>
                          <a @click="goToHorarios" class="text-decoration-underline black--text">
                              <p class="subtitle-1 font-weight-bold">Horários</p>
                          </a>
                          <p>Gerenciar grade horária</p>
                      </div>
                  </v-col>
                  <v-col lg="4" md="4" cols="12" class="pa-5">
                      <div class="float-left mr-3">
                          <a @click="goToSalas">
                              <v-img src="@/assets/salas-icon.png" max-height="130" max-width="130"/>
                          </a>
                      </div>
                      <div>
                          <a @click="goToSalas" class="text-decoration-underline black--text ">
                              <p class="subtitle-1 font-weight-bold">Salas e Laboratórios</p>
                          </a>
                          <p>Gerenciar e designar salas e laboratórios</p>
                      </div>
                  </v-col>
                  <v-col lg="4" md="4" cols="12" class="pa-5">
                      <div class="float-left mr-3">
                          <a @click="goToUsers">
                              <v-img src="@/assets/profile-icon.png" max-height="130" max-width="130"/>
                          </a>
                      </div>
                      <div>
                          <a @click="goToUsers" class="text-decoration-underline black--text ">
                              <p class="subtitle-1 font-weight-bold">Usuários</p>
                          </a>
                          <p>Gerenciar turmas, alunos e professores </p>
                      </div>
                  </v-col>
              </v-row>
          </v-container>
      </v-main>
  </v-app>
</template>

<script>

export default {
    name: "PainelPage",
    methods:{
        goToHorarios(){
            this.$router.push('/horarios');
        },
        goToSalas(){
            this.$router.push('/salas');
        },
        goToUsers(){
            this.$router.push('/usuarios');
        }
    }
}
</script>

<style scoped>
</style>