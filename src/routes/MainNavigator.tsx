import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  SelectRole,
  RegisterPatient,
  RegisterTherapist,
  MethodSelection,
  PatientDashboard,
} from '../views'

export type RootStackScreens = {
  MethodSelection: undefined
  RegisterTherapist: undefined
  RegisterPatient: undefined
  SelectRole: undefined
  PatientDashboard: undefined
}

const Stack = createNativeStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
      <Stack.Screen name="MethodSelection" component={MethodSelection} />
      <Stack.Screen name="RegisterTherapist" component={RegisterTherapist} />
      <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
      <Stack.Screen name="SelectRole" component={SelectRole} />
    </Stack.Navigator>
  )
}

export default MainNavigator
