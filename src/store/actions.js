// https://vuex.vuejs.org/en/actions.html
import { getBoardList } from '../api/board/board.js'
import { getMyEducationList } from '../api/education/education.js'

export default {
  async FETCH_BOARDS (context) {
    const response = await getBoardList()
    context.commit('SET_BOARDS', response.data.response)
  },
  async FETCH_EDUCATIONS (context, userId) {
    const response = await getMyEducationList(userId)
    context.commit('SET_EDUCATIONS', response.data)
  }
}
