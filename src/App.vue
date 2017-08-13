<template>
  <div id="app">
    <div class="container">
      <nav-menu v-if="user" :userAuth="user"></nav-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import NavMenu from './components/Menu'

export default {
  name: 'app',
  computed: {
    // The user is automatically set by the feathers-vuex auth module upon login.
    user () {
      return this.$store.state.auth.user
    }
  },
  watch: {
    // Cek user.
    user (newVal) {
      if(!newVal){
        this.$router.replace({name: 'login'})
      }else{
        this.$router.replace({name: 'Hello'})
      }
    }
  },
  mounted () {
    this.$store.dispatch('auth/authenticate').catch(error => {
      if (!error.message.includes('Could not find stored JWT')) {
        console.error(error)
      }
    })
  },
  components: {
    NavMenu
  }
}
</script>

<style>
#app {
  
}
</style>
