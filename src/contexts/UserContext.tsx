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
import { refreshToken } from '../services/loginService'

interface Props {
  children: ReactNode
  initialToken: string | undefined
}

interface ContextProps {
  getStoredUser: () => Promise<User | undefined>
  setStoredUser: (user: User) => Promise<void>
  setStoredToken: (token: string) => Promise<void>
  getStoredToken: () => Promise<string | null>
  logOut: () => Promise<void>
  user: User | undefined
  token: string | undefined
}

export const UserContext = createContext<ContextProps | undefined>(undefined)

export const useUserContext = () => {
  return useContext(UserContext)
}

const UserContextProvider: FC<Props> = ({ children, initialToken }) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string | undefined>(initialToken)
  const [lastTokenSet, setLastTokenSet] = useState<Moment>()

  const previousToken = usePrevious(token)

  const navigation = useNavigation<any>()

  const userKey = 'user'
  const tokenKey = 'token'

  useEffect(() => {
    if (!token && previousToken !== undefined) {
      navigation.reset({
        routes: [{ name: 'Login' }],
      })
    } else {
      navigation.reset({
        routes: [{ name: 'Menu' }],
      })
    }
  }, [token])

  // useEffect(() => {
  //   if (lastTokenSet) {
  //     const tokenAboutToExpire =
  //       Math.abs(lastTokenSet.minutes() - moment().minutes()) > 5

  //     if (tokenAboutToExpire) {
  //       refreshToken(token!)
  //         .then((response) => {
  //           setStoredToken(response.data.token)
  //         })
  //         .catch((reason) => {
  //           console.log(reason.response.data)
  //         })
  //     }
  //   }
  // })

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

  const logOut = async () => {
    await AsyncStorage.multiRemove([tokenKey, userKey], () => {
      setToken(undefined)
      setUser(undefined)
    })
  }

  return (
    <UserContext.Provider
      value={{
        getStoredUser,
        setStoredUser,
        setStoredToken,
        getStoredToken,
        logOut,
        user,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
