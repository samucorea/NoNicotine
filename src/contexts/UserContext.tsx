import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'
import User from '../models/User'

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

  const navigation = useNavigation<any>()

  const userKey = 'user'
  const tokenKey = 'token'

  useEffect(() => {
    if (!token) {
      navigation.reset({
        routes: [{ name: 'Login' }],
      })
    } else {
      navigation.reset({
        routes: [{ name: 'Menu' }],
      })
    }
  }, [token])

  const getStoredUser = async (): Promise<User | undefined> => {
    const storedUser = await AsyncStorage.getItem(userKey)
    return storedUser ? (JSON.parse(storedUser) as User) : undefined
  }

  const setStoredUser = async (userTMP: User) => {
    await AsyncStorage.setItem(userKey, JSON.stringify(userTMP))
    setUser(userTMP)
  }

  const getStoredToken = async () => {
    return await AsyncStorage.getItem(tokenKey)
  }

  const setStoredToken = async (tokenTMP: string) => {
    await AsyncStorage.setItem(tokenKey, tokenTMP)

    setToken(tokenTMP)
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
