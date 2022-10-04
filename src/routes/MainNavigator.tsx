import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import {
  SelectRole,
  RegisterPatient,
  RegisterTherapist,
  MethodSelection,
} from '../views'

import MenuNavigator from './MenuNavigator'

export type RootStackScreens = {
  MethodSelection: undefined
  RegisterTherapist: undefined
  RegisterPatient: undefined
  SelectRole: undefined
  Menu: undefined
}

const Stack = createNativeStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: '',
      }}
    >
      <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
      <Stack.Screen name="SelectRole" component={SelectRole} />
      <Stack.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MethodSelection" component={MethodSelection} />
      <Stack.Screen name="RegisterTherapist" component={RegisterTherapist} />
    </Stack.Navigator>
  )
}

export type RootScreenProps<T extends keyof RootStackScreens> =
  NativeStackScreenProps<RootStackScreens, T>

export default MainNavigator
