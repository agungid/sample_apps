import 'babel-polyfill'
import feathers from 'feathers'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex'
import store from '@/store/'
import rx from 'feathers-reactive'
import RxJS from 'rxjs'

const socket = io('http://localhost:3031', {transports: ['websocket']})

const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .configure(rx(RxJS, {idField: 'id'}))
  .configure(feathersVuex(store, {
    idField: 'id',
    auth: {
      userService: '/users'
    }
  }))

feathersClient.service('/users')
feathersClient.service('/customers')
// feathersClient.service('/todos').vuex({idField: '_id'})
// feathersClient.service('/deeply/nested/names')
// feathersClient.service('/some/explicit/namespace').vuex({name: '/explicit/namespace'})

export default feathersClient