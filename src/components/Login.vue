<template>
    <main class="login container">.
        <div class="col-md-4 col-md-offset-4">
            <h1>Selamat Datang</h1><hr>
            <div class="row">
                <div class="alert alert-danger" v-if="error">
                    {{error.message}}
                    <a class="close" href="javascript://" @click.prevent="dismissError">x</a>
                </div>
                <form class="form" method="post" @submit.prevent="onSubmit(email, password)">
                    <div class="form-group">
                        <input class="form-control" type="email" name="email" placeholder="email" v-model="email">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="password" name="password" placeholder="password" v-model="password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">
                        Login
                        </button>
                    </div>
                    <!--<router-link as="button" :to="{name: 'Home'}" class="button button-secondary block">Back</router-link>-->
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data () {
        return {
            email: undefined,
            password: undefined,
            error: undefined
        }
    },
    methods: {
        dismissError () {
            this.error = undefined,
            this.clearAuthenticateError()
        },

        onSubmit (email, password) {
            this.authenticate({strategy: 'local', email, password})
            // Just use the returned error instead of mapping it from the store.
            .catch(error => {
            // Convert the error to a plain object and add a message.
            let type = error.className
            error = Object.assign({}, error)
            error.message = (type === 'not-authenticated')
                ? 'Incorrect email or password.'
                : 'An error prevented login.'
            this.error = error
            })
        },

        ...mapMutations('auth', {
            clearAuthenticateError: 'clearAuthenticateError'
        }),
        ...mapActions('auth', ['authenticate']),
    }
}
</script>