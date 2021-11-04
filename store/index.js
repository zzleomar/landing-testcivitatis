/* eslint-disable no-new */
import Vuex from 'vuex'
import activity from './activity'

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  namespaced: true,
  state: {
    activity
  }
})

export const strict = false
