import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, Box } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SafeAreaView>
          <Box>Hello world</Box>
        </SafeAreaView>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
