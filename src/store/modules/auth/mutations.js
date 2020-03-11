const SET_USER = (state, user) => {
  state.auth = user
}

const SET_REGISTER = (state, register) => {
  state.register = register
}

const SET_TOKEN = (state, token) => {
  state.token = token
}

const SET_SEARCHEMAIL = (state, user) => {
  state.searchRegisterUser = user
}

const SET_CREATEUSER = (state, user) => {
  state.createUser = user
}

export default {
  SET_USER,
  SET_TOKEN,
  SET_SEARCHEMAIL,
  SET_CREATEUSER,
  SET_REGISTER
}
