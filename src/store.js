import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userName:'',
        email:'',
        password:'',
        message: {
            text: '',
            type: '',
        },
        turno: 'Manhã',
        day:'Segunda',
    },
    mutations: {
        setEmail(state, payload){
            state.email = payload;
        },
        setPassword(state, payload){
            state.password = payload;
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