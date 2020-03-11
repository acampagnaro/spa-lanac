import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
// import * as mutations from 'mutations'

import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    actions,
    getters,
    modules: {
        auth
    }
})

export default store
