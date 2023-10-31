import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username:'',
        token: null,
        message: {
            text: '',
            type: '',
        },
        turno: 'Manhã',
        day:'Segunda',
    },
    mutations: {
        setUser(state, payload){
            state.username = payload;
        },
        setToken(state, payload){
            state.token = payload;
        },
        setTurno(state, payload){
          state.turno = payload;
        },
        setDay(state, payload){
            state.day = payload;
        },
        showErrorMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'ERROR',
            };
        },
    }
});