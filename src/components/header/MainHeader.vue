<template>
    <v-app-bar app color="primary" prominent>
        <v-spacer />
        <div class="d-flex justify-center align-center">
            <v-img
                    max-height="120"
                    max-width="120"
                    src="@/assets/logoCimol.png"
            />
        </div>
        <v-spacer />
<!--        <div class="fill-height d-flex align-end justify-end mr-5">-->
<!--            <a v-if="name" class="white&#45;&#45;text text-h6 text-decoration-underline">-->
<!--                Olá, {{ name }}-->
<!--            </a>-->
<!--        </div>-->
    </v-app-bar>
</template>


<script>
export default {
    name: "MainHeader",
    watch: {
        '$store.state.turno'(newValue) {
            this.name = newValue;
        },
    },
    computed: {
        name() {
            return this.$store.state.userName;
        },
    },
}
</script>

<style scoped>

</style>