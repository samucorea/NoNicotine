import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { Loading } from '../components'

interface Props {
  children: ReactNode
}

interface ContextProps {
  setLoading: (setter: boolean, message?: string) => void
}

export const LoadingContext = createContext<ContextProps | undefined>(undefined)

export const useLoadingContext = () => {
  return useContext(LoadingContext)
}

const LoadingContextProvider: FC<Props> = ({ children }) => {
  const [loadingState, setLoadingState] = useState<{
    show: boolean
    message: string | undefined
  }>({
    show: false,
    message: undefined,
  })

  const setLoading = (setter: boolean, message = '') => {
    setLoadingState({ show: setter, message })
  }

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {loadingState.show && <Loading message={loadingState.message} />}
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingContextProvider
