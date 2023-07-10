<template>
    <v-app >
<!--        <v-app-bar-->
<!--            app flat prominent color="white"-->
<!--        >-->
<!--            <v-spacer/>-->
<!--            <v-img-->
<!--                max-height="120" max-width="120"-->
<!--                src="@/assets/logoCimol.png"-->
<!--            />-->
<!--            <v-spacer/>-->
<!--        </v-app-bar>-->
        <v-main>
            <v-container fluid>
                <v-row justify="center">
                    <v-col
                        cols="12"
                        md="8"
                        lg="4"
                        class="text-center"
                    >
                        <v-text-field
                            :rules="[rules.required]"
                            label="Email"
                            outlined
                            v-model="email">
                        </v-text-field>
                        <v-text-field
                            label="Senha"
                            outlined
                            v-model="senha"
                            :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required]"
                            :type="showSenha ? 'text' : 'password'"
                            @click:append="showSenha = !showSenha"
                    >

                        </v-text-field>
                        <v-btn
                            variant="outlined"
                            rounded
                            elevation="2"
                            @click="login"
                        >
                            Entrar
                        </v-btn>
                        <p class="mt-5 text-subtitle-1">
                            Não possui uma conta?
                            <button @click="cadastro">
                                <a class="text-decoration-underline black--text">
                                    <strong>Cadastre-se</strong>
                                </a>
                            </button>
                        </p>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer color="white">
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
            email:'',
            senha:'',
            showSenha: false,
            rules: {
                required: value => !!value || 'Required.',
            },
        }
    },
    methods: {
        login() {
            if (this.email && this.senha){
                this.$store.commit('setEmail',this.email);
                this.$store.commit('setSenha',this.senha);
                this.$router.push('/painel');
            } else {
                this.$store.commit(
                    'showErrorMessage',
                    'Você deve informar todos os dados'
                );
            }
        },
        cadastro() {
            this.$router.push('/cadastro');
        }
    }
}
</script>

<style scoped>

</style>