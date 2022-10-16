import axios from 'axios'
import Login from '../models/Login'
import apiRoute from '../utils/apiRoute'

const login = async (credentials: Login) => {
  return await axios.post<{ token: string }>(apiRoute + 'login', credentials)
}

export const refreshToken = async (token: string) => {
  console.log(
    '🚀 ~ file: loginService.ts ~ line 10 ~ refreshToken ~ token',
    token
  )
  return await axios.post<{ token: string }>(apiRoute + 'login/refreshToken', {
    refreshToken: token,
  })
}

export default login
