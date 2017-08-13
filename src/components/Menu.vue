<template>
    <nav class="menu navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" :to="{name: 'Hello'}">Vue & Feathers</router-link>
            </div>
            <ul class="nav navbar-nav">
                <li><router-link :to="{name: 'Hello'}">Home</router-link></li>
                <li><router-link :to="{name: 'cutomers'}">Customers</router-link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="javascript:;">{{userAuth.email}}</a></li>
                <li><a href="javascript:;" @click="logout"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'menu',
    props: ['userAuth'],
    methods: {
        ...mapActions('auth', [
            'logout'
        ])
    }

}
</script>

<style scoped>

</style>