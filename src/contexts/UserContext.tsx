import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, FC, ReactNode, useContext } from 'react'
import User from '../models/user'

interface Props {
  children: ReactNode
}

interface ContextProps {
  getStoredUser: () => Promise<User | undefined>
  setStoredUser: (user: User) => Promise<void>
}

export const UserContext = createContext<ContextProps | undefined>(undefined)

export const useUserContext = () => {
  return useContext(UserContext)
}

const UserContextProvider: FC<Props> = ({ children }) => {
  const userKey = 'user'

  const getStoredUser = async (): Promise<User | undefined> => {
    const storedUser = await AsyncStorage.getItem(userKey)

    return storedUser ? (JSON.parse(storedUser) as User) : undefined
  }

  const setStoredUser = async (user: User) => {
    await AsyncStorage.setItem(userKey, JSON.stringify(user))
  }

  return (
    <UserContext.Provider value={{ getStoredUser, setStoredUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
