import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack'
import { SelectRole, MethodSelection, Register } from '../views'
import Ionicons from '@expo/vector-icons/Ionicons'

import MenuNavigator from './MenuNavigator'
import { Icon, useColorModeValue } from 'native-base'
import theme from '../AppTheme'

export type RootStackScreens = {
  MethodSelection: undefined
  Register: { role: 'therapist' | 'patient' }
  SelectRole: undefined
  Menu: undefined
}

const Stack = createStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: '',
        headerBackImage: () => (
          <Icon
            as={Ionicons}
            name="arrow-back"
            size={'2xl'}
            color={useColorModeValue(
              theme.colors.primary.default,
              theme.colors.primary.light
            )}
          />
        ),
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="SelectRole"
        component={SelectRole}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary.default,
          },
        }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MethodSelection" component={MethodSelection} />
    </Stack.Navigator>
  )
}

export type RootScreenProps<T extends keyof RootStackScreens> =
  StackScreenProps<RootStackScreens, T>

export default MainNavigator
