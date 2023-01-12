import i18next from 'i18next'
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
  handleLanguageChange: () => void
}

export const SettingsContext = createContext<ContextProps | undefined>(
  undefined
)

export const useSettingsContext = () => {
  return useContext(SettingsContext)
}

const SettingsContextProvider: FC<Props> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('es')

  const handleLanguageChange = () => {
    console.log('changing')

    if (currentLanguage == 'es') {
      i18next.changeLanguage('en')
      setCurrentLanguage('en')
    } else {
      i18next.changeLanguage('es')
      setCurrentLanguage('es')
    }
  }

  return (
    <SettingsContext.Provider value={{ handleLanguageChange }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextProvider
