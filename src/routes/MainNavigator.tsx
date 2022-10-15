import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack'
import { SelectRole, MethodSelection, Register, Login } from '../views'
import Ionicons from '@expo/vector-icons/Ionicons'

import MenuNavigator from './MenuNavigator'
import { Icon, useColorModeValue } from 'native-base'
import theme from '../AppTheme'
import CigaretteQuestionnaire from '../views/Register/CigaretteQuestionnaire'
import CigarQuestionnaire from '../views/Register/CigarQuestionnaire'
import HookahQuestionnaire from '../views/Register/HookahQuestionnaire'
import VapeQuestionnaire from '../views/Register/VapeQuestionnaire'

type RootStackScreens = {
  VapeQuestionnaire: undefined
  HookahQuestionnaire: undefined
  CigarQuestionnaire: undefined
  CigaretteQuestionnaire: undefined
  MethodSelection: undefined
  Register: { role: 'therapist' | 'patient' }
  SelectRole: undefined
  Menu: undefined
  Login: undefined
}

const Stack = createStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MethodSelection"
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
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary.default,
          },
        }}
      />
      <Stack.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SelectRole"
        component={SelectRole}
        options={{
          headerBackImage: () => (
            <Icon as={Ionicons} name="close" size={'2xl'} color={'#fff'} />
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary.default,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen name="Register" component={Register} />

      <Stack.Screen name="MethodSelection" component={MethodSelection} />
      <Stack.Screen
        name="CigaretteQuestionnaire"
        component={CigaretteQuestionnaire}
      />
      <Stack.Screen name="CigarQuestionnaire" component={CigarQuestionnaire} />
      <Stack.Screen
        name="HookahQuestionnaire"
        component={HookahQuestionnaire}
      />
      <Stack.Screen name="VapeQuestionnaire" component={VapeQuestionnaire} />
    </Stack.Navigator>
  )
}

export type RootScreenProps<T extends keyof RootStackScreens> =
  StackScreenProps<RootStackScreens, T>

export default MainNavigator
