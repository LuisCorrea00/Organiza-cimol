import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: null,
        token: null,
        message: {
            text: '',
            type: '',
        },
        turno: 'Manhã',
        day:'Segunda',
        editDialog: false,
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
        showSuccessMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'SUCCESS',
            };
        },
        setEditDialog(state, payload){
            state.editDialog = payload;
        },
    }
});