/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

/**
 * Author: 이현재
 * Part : boards, educations, departments, boardHeaders, educationHeaders
 * Author : 정태균
 * Part : user
 */

Vue.use(Vuex)

// Create a new store
export const store = new Vuex.Store({
  actions,
  getters,
  modules,
  mutations,
  state
})

export default store
