<template>
    <v-app-bar app color="primary" prominent>
        <v-spacer />
        <div class="d-flex justify-center align-center">
            <router-link to="/painel">
                <v-img
                    max-height="120"
                    max-width="120"
                    src="@/assets/logoCimol.png"
                />
            </router-link>
        </div>
        <v-spacer />
    </v-app-bar>
</template>

<script>
export default {
    name: 'MainHeader',
    data() {
        return {};
    },
};
</script>

<style scoped></style>
