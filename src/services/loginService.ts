import axios from 'axios'
import Login from '../models/Login'
import apiRoute from '../utils/apiRoute'

const login = async (credentials: Login) => {
  return await axios.post<{ token: string }>(apiRoute + 'login', credentials)
}

export default login
