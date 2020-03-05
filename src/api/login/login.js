import axios from 'axios'
import { config } from '../index.js'

// 조회 - 로그인 페이지
function getLoginRedirect () {
  return axios.get(`${config.baseUrl}login`, { withCredentials: true })
}

// 조회 - 등록 사용자 여부
function getIsRegisterUser () {
  return axios.get(`${config.baseUrl}login/isRegister`, { withCredentials: true })
}

// 조회 - 인증 사용자 여부
function getIsAuthenticationUser () {
  return axios.get(`${config.baseUrl}auth/user`, { withCredentials: true })
}

export {
  getLoginRedirect,
  getIsRegisterUser,
  getIsAuthenticationUser
}

// Pass cookies with axios or fetch requests - https://dev.to/hugo__df/pass-cookies-with-axios-or-fetch-requests-5881
