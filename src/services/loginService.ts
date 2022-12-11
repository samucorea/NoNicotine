import axios from 'axios'
import Login from '../models/Login'
import apiRoute from '../utils/apiRoute'
import { Roles } from '../utils/enums/Roles'
import getTokenRole from '../utils/payload'
import patientService from './patientService'
import therapistService from './therapistService'

interface LoginResponse {
  token: string
  refreshToken: string
}

interface RefreshTokenResponse {
  token: string
  refreshToken: string
}

const login = async (credentials: Login) => {
  const response = await axios.post<LoginResponse>(
    apiRoute + 'login',
    credentials
  )
  const role = getTokenRole(response.data.token)

  const service =
    role == Roles.patient
      ? async (token: string) => await patientService.getCurrentPatient(token)
      : async (token: string) =>
          await therapistService.getCurrentTherapist(token)

  const userResponse = await service(response.data.token)

  userResponse.data.role = role!

  return {
    userResponse: userResponse.data,
    token: response.data.token,
    refreshToken: response.data.refreshToken,
  }
}

export const refreshCurrentToken = async (token: string) => {
  return await axios.post<RefreshTokenResponse>(
    apiRoute + 'login/refreshToken',
    {
      refreshToken: token,
    }
  )
}

export const resetPassword = async (email: string) => {
  return await axios.post<{ message: string }>(
    apiRoute + 'login/passwordReset',
    {
      email,
    }
  )
}

export default login
