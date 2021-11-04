const store = {
  state: () => ({
    activities: [],
    load: false,
    quantity: 1,
    date: ''
  }),
  mutations: {
    mutResert(state) {
      state.activities = []
      state.quantity = 1
      state.date = ''
    },
    mutActivities(state, activities) {
      state.activities = activities
    },
    mutToggleSpinning(state, load) {
      state.load = load
    },
    mutLoadData(state, payload) {
      state.quantity = payload.quantity
      state.date = payload.date
    }
  },
  actions: {
    loadActivities: ({ commit }, { self, payload }) => {
      commit('mutLoadData', payload)
      return new Promise((resolve, reject) => {
        self.$axios
          .$post('activities/search', payload)
          .then((response) => {
            commit('mutActivities', response.data)
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    onSell: ({ commit }, { self, payload }) => {
      return new Promise((resolve, reject) => {
        self.$axios
          .$post('reservate', payload)
          .then((response) => {
            commit('mutResert')
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    toggleSpinning: ({ commit }, value) => {
      commit('mutToggleSpinning', value)
    }
  }
}

export default store
