import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SelectRole } from '../views'
import RegisterPatient from '../views/RegisterPatient'
import RegisterTherapist from '../views/RegisterTherapist'
import MethodSelection from '../views/MethodSelection'

export type RootStackScreens = {
  MethodSelection: undefined
  RegisterTherapist: undefined
  RegisterPatient: undefined
  SelectRole: undefined
}

const Stack = createNativeStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MethodSelection" component={MethodSelection} />
      <Stack.Screen name="RegisterTherapist" component={RegisterTherapist} />
      <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
      <Stack.Screen name="SelectRole" component={SelectRole} />
    </Stack.Navigator>
  )
}

export default MainNavigator
