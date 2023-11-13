<template>
    <v-main>
        <v-container fluid class="pt-15">
            <v-row class="justify-center pt-5">
                <v-col cols="12" md="8" lg="6" class="text-center">
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
                        color="primary"
                        block
                        @click="login"
                        :loading="loading"
                        class="btn"
                    >
                        Entrar
                    </v-btn>
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
                required: (value) => !!value,
            },
            loading: false,
        };
    },
    methods: {
        login() {
            this.loading = true;
            if (this.email && this.password) {
                try {
                    axios
                        .post('https://api-cimol.onrender.com/user/login', {
                            email: this.email,
                            senha: this.password,
                        })
                        .then((response) => {
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
                                    this.loading = false;
                                    this.$router.push('/painel');
                                } else {
                                    this.loading = false;
                                    this.$store.commit(
                                        'showErrorMessage',
                                        'Você não tem permissão para acessar o painel de controle'
                                    );
                                }
                            } else {
                                this.loading = false;
                                this.$store.commit(
                                    'showErrorMessage',
                                    'Os dados inseridos não conferem com nenhum usuário cadastrado'
                                );
                            }
                        });
                } catch (err) {
                    this.loading = false;
                    this.$store.commit(
                        'showErrorMessage',
                        'Não foi possível realizar o login'
                    );
                }
            } else {
                this.loading = false;
                this.$store.commit(
                    'showErrorMessage',
                    'Você deve informar todos os dados'
                );
            }
        },
    },
};
</script>

<style scoped>
.btn {
    transition: all 0.3s;
    &:hover {
        transform: scale(1.04);
    }
}
</style>
