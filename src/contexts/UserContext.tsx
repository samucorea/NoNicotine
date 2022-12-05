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
import usePrevious from '../hooks/usePreviousState'
import { Patient } from '../models'
import { Therapist } from '../models/Therapist'
import User from '../models/User'
import BaseCrudService from '../services/baseCrudService'
import { refreshCurrentToken } from '../services/loginService'

interface Props {
  children: ReactNode
  initialToken: string | undefined
}

interface ContextProps {
  getStoredUser: () => Promise<User | undefined>
  setStoredUser: (user: User) => Promise<void>
  setStoredToken: (token: string) => Promise<void>
  setStoredRefreshToken: (refreshTokenTMP: string) => Promise<void>
  getStoredToken: () => Promise<string | null>
  logOut: () => Promise<void>
  token: string | undefined
  refreshToken: string | undefined
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
  return useContext<T | undefined>(UserContext as React.Context<T | undefined>)
}

const UserContextProvider: FC<Props> = ({ children, initialToken }) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string | undefined>(initialToken)
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [lastTokenSet, setLastTokenSet] = useState<Moment>(moment('12/11/2000'))

  const previousToken = usePrevious(token)

  const navigation = useNavigation<any>()

  const userKey = 'user'
  const tokenKey = 'token'
  const refreshTokenKey = 'refreshToken'

  useEffect(() => {
    console.log('Go to login', !token && previousToken !== undefined)

    if (!token && previousToken !== undefined) {
      navigation.reset({
        routes: [{ name: 'Login' }],
      })
    } else {
      getStoredUser().then((userTMP) => {
        setUser(userTMP as User)
      })
    }
  }, [token])

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (lastTokenSet) {
        const tokenAboutToExpire = moment().diff(lastTokenSet, 'minutes') > 5
        console.log(
          '🚀 ~ file: UserContext.tsx ~ line 72 ~ checkTokenValidity ~ lastTokenSet',
          lastTokenSet,
          moment()
        )
        console.log(
          '🚀 ~ file: UserContext.tsx ~ line 72 ~ checkTokenValidity ~ tokenAboutToExpire',
          tokenAboutToExpire
        )

        if (tokenAboutToExpire) {
          let refreshTokenTMP = refreshToken

          console.log('refresh token', refreshTokenTMP)

          if (!refreshTokenTMP) {
            refreshTokenTMP = await getStoredRefreshToken()

            if (refreshTokenTMP == undefined) {
              return await logOut()
            }

            setRefreshToken(refreshTokenTMP)
          }

          try {
            const response = await refreshCurrentToken(refreshTokenTMP)
            console.log(
              '🚀 ~ file: UserContext.tsx:99 ~ checkTokenValidity ~ response',
              response.data.token
            )

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
    setUser(userTMP)
    await AsyncStorage.setItem(userKey, JSON.stringify(userTMP))
  }

  const getStoredToken = async () => {
    return await AsyncStorage.getItem(tokenKey)
  }

  const setStoredToken = async (tokenTMP: string) => {
    await AsyncStorage.setItem(tokenKey, tokenTMP)

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

  const logOut = async () => {
    await AsyncStorage.multiRemove([tokenKey, userKey, refreshTokenKey], () => {
      setToken(undefined)
      setRefreshToken(undefined)
      setUser(undefined)
    })
    navigation.navigate('Login')
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
        token,
        refreshToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
