import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import LoginPage from '@/pages/login/LoginPage.vue';
import PainelPage from "@/pages/painel/PainelPage.vue";
import SalasPage from "@/pages/salas/SalasPage.vue";

Vue.use(Router);

const authGuard = (to, from, next) => {
    const token = store.state.token;

    if (token != null) {
        next();
    } else {
        next({ path: '/' });
    }
};


const routes = [
    { path: '/', name: 'login', component: LoginPage },
    { path: '/painel', name:'painel', component: PainelPage, beforeEnter: authGuard },
    { path: '/salas', name:'salas', component: SalasPage, beforeEnter: authGuard },
    { path: '*', redirect: '/' },
];

export default new Router({ routes });