import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'
// import feathersVuex from '../feathers-vuex/'
// import feathersClient from '../api/feathers-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  plugins: [
    // feathersVuex(feathersClient)
  ],
  modules: {
    customer
  }
})
