import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from './src/AppTheme'
import { MainNavigator } from './src/routes'

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
