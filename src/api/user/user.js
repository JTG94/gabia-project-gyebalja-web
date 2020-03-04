import axios from 'axios'
import { config } from '../index.js'

// 생성 - 사용자
function postUserItem (user) {
  return axios.post(`${config.baseUrl}users`, user)
}

export {
  postUserItem
}