<template>
    <v-app >
        <v-app-bar
            app flat prominent color="white"
        >
            <v-spacer/>
            <v-img
                max-height="120" max-width="120"
                src="@/assets/logoCimol.png"
            />
            <v-spacer/>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <v-row justify="center">
                    <v-col
                        cols="12"
                        md="8"
                        lg="4"
                        class="text-center"
                    >
                        <v-text-field label="Email" variant="outlined" class="pa-2" ></v-text-field>
                        <v-text-field label="Senha" variant="outlined" class="pa-2" ></v-text-field>
                        <v-btn
                            variant="outlined"
                            rounded
                            elevation="2"
                            @click="login"
                        >
                            Entrar
                        </v-btn>
                        <p class="mt-5 text-subtitle-1">
                            Não possui uma conta? <button @click="cadastro"><a><strong class="text-decoration-underline">Cadastre-se</strong></a></button>
                        </p>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer>
            <v-row justify="center">
                <p class="font-weight-light">R. Guilherme Lahm, 1778 - Taquara-RS</p>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: "LoginPage",
    data(){
        return{

        }
    },
    methods: {
        login() {
            this.$router.push('/painel');
        },
        cadastro() {
            this.$router.push('/cadastro');
        }
    }
}
</script>

<style scoped>

</style>