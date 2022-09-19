import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SelectRole } from '../views'
import RegisterPatient from '../views/RegisterPatient'

export type RootStackScreens = {
  RegisterPatient: undefined
  SelectRole: undefined
}

const Stack = createNativeStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
      <Stack.Screen name="SelectRole" component={SelectRole} />
    </Stack.Navigator>
  )
}

export default MainNavigator
