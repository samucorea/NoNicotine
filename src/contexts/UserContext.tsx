import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import moment, { Moment } from 'moment'
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'
import { Patient, Login } from '../models'
import { Therapist } from '../models/Therapist'
import User from '../models/User'
import BaseCrudService from '../services/baseCrudService'
import login, { refreshCurrentToken } from '../services/loginService'
import patientService from '../services/patientService'
import { Roles } from '../utils/enums/Roles'

interface Props {
  children: ReactNode
}

interface ContextProps {
  getStoredUser: () => Promise<User | undefined>
  setStoredUser: (user: User) => Promise<void>
  setStoredToken: (token: string) => Promise<void>
  setStoredRefreshToken: (refreshTokenTMP: string) => Promise<void>
  getStoredToken: () => Promise<string | null>
  logOut: () => Promise<void>
  logIn: (credentials: Login) => Promise<Patient | Therapist>
  refetchUser: () => Promise<void>
  token: string | undefined
  refreshToken: string | undefined
  loading: boolean
}

export interface PatientContextProps extends ContextProps {
  user: Patient | undefined
}

export interface TherapistContextProps extends ContextProps {
  user: Therapist | undefined
}

export const UserContext = createContext<
  PatientContextProps | TherapistContextProps | undefined
>(undefined)

export const useUserContext = <
  T extends PatientContextProps | TherapistContextProps
>() => {
  return useContext<T | undefined>(UserContext as React.Context<T | undefined>)!
}

const UserContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string | undefined>()
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [lastTokenSet, setLastTokenSet] = useState<Moment>(moment('12/11/2000'))
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation<any>()

  const userKey = 'user'
  const tokenKey = 'token'
  const refreshTokenKey = 'refreshToken'

  useEffect(() => {
    const getStored = async () => {
      const [storedUser, storedToken, storedRefreshToken] = await Promise.all([
        getStoredUser(),
        getStoredToken(),
        getStoredRefreshToken(),
      ])

      if (storedUser && storedToken && storedRefreshToken) {
        setUser(storedUser)
        setToken(storedToken)
        setRefreshToken(storedRefreshToken)
      }

      setLoading(false)
    }

    getStored()
  }, [])

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (lastTokenSet) {
        const tokenAboutToExpire = moment().diff(lastTokenSet, 'minutes') > 5

        if (tokenAboutToExpire) {
          let refreshTokenTMP = refreshToken

          if (!refreshTokenTMP) {
            refreshTokenTMP = await getStoredRefreshToken()

            if (refreshTokenTMP == undefined) {
              return await logOut()
            }

            setRefreshToken(refreshTokenTMP)
          }

          try {
            const response = await refreshCurrentToken(refreshTokenTMP)

            await setStoredToken(response.data.token)
            await setStoredRefreshToken(response.data.refreshToken)

            BaseCrudService.UpdateConfig()
          } catch (error: any) {
            console.log(
              '🚀 ~ file: UserContext.tsx:110 ~ checkTokenValidity ~ error',
              error.response.data
            )
          }
        }
      }
    }
    checkTokenValidity()
  })

  const getStoredUser = async (): Promise<User | undefined> => {
    const storedUser = await AsyncStorage.getItem(userKey)
    return storedUser ? (JSON.parse(storedUser) as User) : undefined
  }

  const setStoredUser = async (userTMP: User) => {
    console.log('setted user')

    setUser(userTMP)
    await AsyncStorage.setItem(userKey, JSON.stringify(userTMP))
  }

  const getStoredToken = async () => {
    return await AsyncStorage.getItem(tokenKey)
  }

  const setStoredToken = async (tokenTMP: string) => {
    await AsyncStorage.setItem(tokenKey, tokenTMP)

    console.log(tokenKey)

    setToken(tokenTMP)
    setLastTokenSet(moment())
  }

  const setStoredRefreshToken = async (refreshTokenTMP: string) => {
    await AsyncStorage.setItem(refreshTokenKey, refreshTokenTMP)

    setRefreshToken(refreshTokenTMP)
  }

  const getStoredRefreshToken = async () => {
    const token = await AsyncStorage.getItem(refreshTokenKey)

    if (token == null) {
      return undefined
    }

    return token
  }

  const logIn = async (credentials: Login) => {
    const { userResponse, token, refreshToken } = await login(credentials)

    await setStoredRefreshToken(refreshToken)
    await setStoredToken(token)
    await setStoredUser(userResponse)

    BaseCrudService.config = { headers: { Authorization: `Bearer ${token}` } }

    return userResponse
  }

  const logOut = async () => {
    await AsyncStorage.multiRemove([tokenKey, userKey, refreshTokenKey], () => {
      setToken(undefined)
      setRefreshToken(undefined)
      setUser(undefined)
    })

    navigation.navigate('Login')
  }

  const refetchUser = async () => {
    const response = await patientService.getCurrentPatient(token!)

    response.data.role = Roles.patient

    setStoredUser(response.data)
  }

  return (
    <UserContext.Provider
      value={{
        getStoredUser,
        setStoredUser,
        setStoredToken,
        setStoredRefreshToken,
        getStoredToken,
        logOut,
        user,
        logIn,
        token,
        refreshToken,
        loading,
        refetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
