<template>
    <v-main>
        <v-container fluid class="pt-15">
            <v-row class="justify-center pt-15">
                <v-col cols="12" md="8" lg="4" class="text-center">
                    <v-text-field
                        :rules="[rules.required]"
                        label="Email"
                        outlined
                        v-model="email"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Senha"
                        outlined
                        v-model="password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required]"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
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
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
            rules: {
                required: (value) => !!value || 'Obrigatório.',
            },
        };
    },
    methods: {
        login() {
            if (this.email && this.password) {
                try {
                    axios
                        .post('http://localhost:3000/user/login', {
                            email: this.email,
                            senha: this.password,
                        })
                        .then((response) => {
                            console.log(response);
                            if (response.data.user) {
                                if (response.data.user.admin === 1) {
                                    this.$store.commit(
                                        'setUser',
                                        response.data.user
                                    );
                                    this.$store.commit(
                                        'setToken',
                                        response.data.token
                                    );
                                    this.$router.push('/painel');
                                } else {
                                    this.$store.commit(
                                        'showErrorMessage',
                                        'Você não tem permissão para acessar o painel de controle'
                                    );
                                }
                            } else {
                                this.$store.commit(
                                    'showErrorMessage',
                                    'Os dados inseridos não conferem com nenhum usuário cadastrado'
                                );
                            }
                        });
                } catch (err) {
                    this.$store.commit(
                        'showErrorMessage',
                        'Não foi possível realizar o login'
                    );
                }
            } else {
                this.$store.commit(
                    'showErrorMessage',
                    'Você deve informar todos os dados'
                );
            }
        },
        cadastro() {
            this.$router.push('/cadastro');
        },
    },
};
</script>

<style scoped></style>
