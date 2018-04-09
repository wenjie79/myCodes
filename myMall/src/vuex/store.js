import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    goodsList: [],
    searchFliter: '',
    start: 1,
    total: 0
  },
  mutations: {
    getList(state, msg ){
      state.goodsList = msg;
    },
    getSearchFliter(state, msg) {
      state.searchFliter = msg;
    },
    getStart(state, msg) {
      state.start = msg;
    },
    getTotal(state, msg) {
      state.total = msg;
    }
  }
})
 export default store
