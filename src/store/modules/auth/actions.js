import localforage from 'localforage'
import axios from 'axios'
import routes from '../../../router'
import store from '../../../store'

const setSearchEmail = ({ commit }, user) => {
  return new Promise(async (resolve, reject) => {
    await axios.post(process.env.URL + '/my-clinic-new/auth/search-user', { username: user }, {
      params: {
        customer: 'this.customer'
      }
    }).then((emailUser) => {
      console.log(emailUser.data)
      if (emailUser.data.result[0].results.length > 0) {
        return resolve(commit('SET_SEARCHEMAIL', emailUser.data.result[0].results))
      } else {
        return routes.push('/auth/sing-up')
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

const setCreateUser = ({ commit }, payload) => {
  return new Promise(async (resolve, reject) => {
    await axios.post(`${process.env.URL}/my-clinic-new/auth/create`, payload, {
      params: {
        customer: 'this.customer'
      }
    }).then((user) => {
      routes.push('/auth/login')
      resolve(commit('SET_CREATEUSER', user))
    }).catch((err) => {
      reject(err)
    })
  })
}

const setLogin = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    const { username, password, customer, remeberMe } = payload
    axios.post(`${process.env.URL}/my-clinic-new/auth/login`, {
      username: username,
      password: password
    }, {
      params: {
        customer: customer
      }
    }).then((response) => {
      const auth = response.data.result.auth.map((item) => {
        return {
          isLogged: true,
          user: {
            id: item._id,
            username: item.username,
            name: item.name,
            crm: item.myClinic[0].crm,
            customer: item.myClinic[0].customerId || item.myClinic[0].customer,
            credentials: btoa(username + ':' + password)
          },
          account: {
            myClinic: item.myClinic
          },
          profile: {
            username: item.username,
            name: item.name
          }
        }
      })
      commit('SET_TOKEN', response.data.result.token)
      commit('SET_USER', auth[0])
      store.dispatch('setCustomer', auth[0].user.customer, {})
      if (remeberMe) {
        localforage.setItem('my-clinic-user', auth[0], (err) => {
          if (err) window.console.error(err)
          localforage.setItem('my-clinic-customer', auth[0].user.customer).then((value) => {})
          localforage.setItem('my-clinic-token', response.data.result.token, (err) => {
            if (err) window.console.error(err)
          })
        })
      }
      resolve(routes.push('/schedule'))
    }).catch((err) => {
      window.console.error('errologin', err)
      reject(err)
    })
  })
}

const setSingIn = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    const { username, password, customer } = payload
    axios.post(`${process.env.URL}/my-clinic-new/auth/login`, {
      username: username,
      password: password
    }, {
      params: {
        customer: customer
      }
    }).then((response) => {
      const auth = response.data.result.auth.map((item) => {
        return {
          isLogged: true,
          user: {
            id: item._id,
            username: item.username,
            name: item.name,
            crm: item.myClinic[0].crm,
            customer: item.myClinic[0].customerId || item.myClinic[0].customer,
            credentials: btoa(username + ':' + password)
          },
          profile: {}
        }
      })
      commit('SET_TOKEN', response.data.result.token)
      commit('SET_USER', auth[0])
      store.dispatch('setCustomer', auth[0].user.customer, {})
      resolve(routes.push('/schedule'))
    }).catch((err) => {
      window.console.error('errologin', err)
      reject(err)
    })
  })
}

const setSingOut = ({ commit }, user) => {
  const auth = {
    isLogged: false,
    user: {
      id: null,
      username: null,
      name: null,
      crm: null,
      customer: null
    },
    profile: {}
  }
  commit('SET_TOKEN', null)
  commit('SET_USER', auth)
  localforage.removeItem('my-clinic-customer')
  localforage.removeItem('my-clinic-token')
  localforage.removeItem('my-clinic-user')
}

const setUser = ({ commit }, user) => {
  commit('SET_USER', user)
}

const setRegister = ({ commit }, user) => {
  commit('SET_REGISTER', user)
}

const setToken = ({ commit }, token) => {
  commit('SET_TOKEN', token)
}

const setRecoveryPassword = ({ commit }, token) => {
  commit('SET_RECOVERY_PASSWORD', token)
}

export default {
  setUser,
  setToken,
  setLogin,
  setRecoveryPassword,
  setSingOut,
  setSearchEmail,
  setCreateUser,
  setRegister,
  setSingIn
}
