import Vue from 'vue'
import Vuex from 'vuex'
// import * as mutations from 'mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
    }
})

export default store
