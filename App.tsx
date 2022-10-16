import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from './src/AppTheme'
import { MainNavigator } from './src/routes'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import UserContextProvider from './src/contexts/UserContext'
import { setLocale } from 'yup'
import LoadingContextProvider, {
  LoadingContext,
} from './src/contexts/LoadingContext'
moment.locale('es')

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

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
        <UserContextProvider>
          <LoadingContextProvider>
            <MainNavigator />
          </LoadingContextProvider>
        </UserContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
