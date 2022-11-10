import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from './src/AppTheme'
import { MainNavigator } from './src/routes'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import UserContextProvider from './src/contexts/UserContext'
import { setLocale } from 'yup'
import LoadingContextProvider, {
  LoadingContext,
} from './src/contexts/LoadingContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
moment.locale('es')

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string>()

  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    const loginWithStored = async () => {
      // const user = userContext?.getStoredUser()
      const token = await AsyncStorage.getItem('token')

      setToken(token == null ? undefined : token)
      setLoading(false)

      // if (user !== undefined && token !== null) {
      //   userContext?.setStoredUser(user)
      //   userContext?.setStoredToken(token)
      // }
    }

    loginWithStored()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  setLocale({
    mixed: {
      default: 'El valor introducido no es válido',
      required: 'Este campo es obligatorio',
    },
    string: {
      email: 'Este correo no es válido',
    },
  })

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <UserContextProvider initialToken={token}>
          <LoadingContextProvider>
            <MainNavigator />
          </LoadingContextProvider>
        </UserContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
