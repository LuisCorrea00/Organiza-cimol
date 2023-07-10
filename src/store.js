import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        email:'',
        senha:'',
        message: {
            text: '',
            type: '',
        },
    },
    mutations: {
        setEmail(state, payload){
            state.email = payload;
        },
        setSenha(state, payload){
            state.senha = payload;
        },
        showErrorMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'ERROR',
            };
        },
        showSuccessMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'SUCCESS',
            };
        },
    }
});