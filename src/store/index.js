import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import lock from './modules/lock'
import dict from './modules/dict'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    unreadCount: 2 // 未读消息数
  },
  mutations: {
    setUnreadCount(state, count) {
      state.unreadCount = count
    }
  },
  modules: {
    app,
    lock,
    dict,
    user,
    tagsView,
    permission,
    settings
  },
  getters
})

export default store
