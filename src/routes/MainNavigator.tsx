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
  PatientDashboard,
} from '../views'

import { CustomIconButton } from '../components'
import { ImageSourcePropType } from 'react-native'

const Profile: ImageSourcePropType = require('../../assets/profile.png')

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
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: '',
      }}
    >
      <Stack.Screen
        name="PatientDashboard"
        component={PatientDashboard}
        options={{
          headerRight: () => <CustomIconButton icon={Profile} />,
        }}
      />
      <Stack.Screen name="MethodSelection" component={MethodSelection} />
      <Stack.Screen name="RegisterTherapist" component={RegisterTherapist} />
      <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
      <Stack.Screen name="SelectRole" component={SelectRole} />
    </Stack.Navigator>
  )
}

export type RootScreenProps<T extends keyof RootStackScreens> =
  NativeStackScreenProps<RootStackScreens, T>

export default MainNavigator
