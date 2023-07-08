import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from './components/login/LoginPage.vue';
import PainelPage from "@/components/painel/PainelPage.vue";

Vue.use(Router);

const routes = [
    { path: '/', name: 'login', component: LoginPage },
    { path: '/painel', name:'painel', component: PainelPage },
];

export default new Router({ routes });