<template>
    <div>
        <v-snackbar v-model="this.$store.state.showMessage" :color="color" timeout="-1">
            {{ message }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="closeSnackbar">
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'FeedBack',
    data() {
        return {
            message: '',
            color: '',
        };
    },
    watch: {
        '$store.state.message.text': 'setMessage',
    },
    methods: {
        setMessage() {
            this.message = this.$store.state.message.text;
            this.color =
                this.$store.state.message.type === 'ERROR'
                    ? 'error'
                    : 'success';
        },
        closeSnackbar() {
            this.$store.commit('setShowMessage', false);
        },
    },
};
</script>
