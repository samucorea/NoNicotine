import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from './src/AppTheme'
import { MainNavigator } from './src/routes'
import moment from 'moment'
import 'moment/locale/es'
import UserContextProvider from './src/contexts/UserContext'
import { setLocale } from 'yup'
import LoadingContextProvider from './src/contexts/LoadingContext'
import { LogBox } from 'react-native'
import './src/settings/i18n/i18n'
import { useTranslation } from 'react-i18next'
import SettingsContextProvider from './src/contexts/SettingsContext'
moment.locale('es')

// SplashScreen.preventAutoHideAsync()

export default function App() {
  LogBox.ignoreAllLogs()

  const { t } = useTranslation()

  setLocale({
    mixed: {
      default: t('validations.default')!,
      required: t('validations.required')!,
    },
    string: {
      email: t('validations.email')!,
    },
  })

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <UserContextProvider>
          <SettingsContextProvider>
            <LoadingContextProvider>
              <MainNavigator />
            </LoadingContextProvider>
          </SettingsContextProvider>
        </UserContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
