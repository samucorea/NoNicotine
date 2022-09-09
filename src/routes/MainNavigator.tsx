import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SelectRole } from '../views'

export type RootStackScreens = {
  SelectRole: undefined
}

const Stack = createNativeStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SelectRole" component={SelectRole} />
    </Stack.Navigator>
  )
}

export default MainNavigator
