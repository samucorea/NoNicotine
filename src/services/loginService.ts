import axios from 'axios'
import Login from '../models/Login'
import apiRoute from '../utils/apiRoute'

interface LoginResponse {
  token: string
  refreshToken: string
}

const login = async (credentials: Login) => {
  return await axios.post<LoginResponse>(apiRoute + 'login', credentials)
}

export const refreshCurrentToken = async (token: string) => {
  return await axios.post<{ token: string }>(apiRoute + 'login/refreshToken', {
    refreshToken: token,
  })
}

export default login
