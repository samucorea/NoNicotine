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
import User from '../models/User'
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
  user: User | undefined
  token: string | undefined
  refreshToken: string | undefined
}

export const UserContext = createContext<ContextProps | undefined>(undefined)

export const useUserContext = () => {
  return useContext(UserContext)
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
    if (!token && previousToken !== undefined) {
      navigation.reset({
        routes: [{ name: 'Login' }],
      })
    } else {
      getStoredUser().then((userTMP) => {
        console.log('go to menu')

        setUser(userTMP as User)
        navigation.reset({
          routes: [{ name: 'Menu' }],
        })
      })
    }
  }, [token])

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (lastTokenSet) {
        const tokenAboutToExpire = moment().diff(lastTokenSet, 'minutes') > 5
        console.log(
          '🚀 ~ file: UserContext.tsx ~ line 71 ~ checkTokenValidity ~ tokenAboutToExpire',
          tokenAboutToExpire
        )

        if (tokenAboutToExpire) {
          let refreshTokenTMP = refreshToken

          if (!refreshTokenTMP) {
            refreshTokenTMP = await getStoredRefreshToken()

            if (refreshTokenTMP == undefined) {
              return await logOut()
            }

            setRefreshToken(refreshTokenTMP)
          }

          const response = await refreshCurrentToken(refreshTokenTMP)
          console.log(
            '🚀 ~ file: UserContext.tsx ~ line 90 ~ checkTokenValidity ~ response',
            response
          )

          setStoredToken(response.data.token)
        }
      }
    }
    checkTokenValidity()

    // if (!user) {
    //   console.log('getting stored')

    //   getStoredUser().then((user: User | undefined) => {
    //     setUser(user)
    //   })
    // }
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
