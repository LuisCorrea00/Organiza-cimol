<template>
    <v-app>
        <main-header />
        <router-view />
        <feed-back />
    </v-app>
</template>

<script>
import MainHeader from '@/components/header/MainHeader.vue';
import FeedBack from '@/components/feedback/FeedBack.vue';
export default {
    name: 'App',

    components: {
        FeedBack,
        MainHeader,
    },

    data: () => ({
        //
    }),
};
</script>

