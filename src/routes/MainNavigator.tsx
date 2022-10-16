import React, { useEffect } from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack'
import { SelectRole, MethodSelection, Register, Login, Profile } from '../views'
import Ionicons from '@expo/vector-icons/Ionicons'

import MenuNavigator from './MenuNavigator'
import { Icon, useColorModeValue } from 'native-base'
import theme from '../AppTheme'
import { useUserContext } from '../contexts/UserContext'

type RootStackScreens = {
  MethodSelection: undefined
  Register: { role: 'therapist' | 'patient' }
  SelectRole: undefined
  Menu: undefined
  Login: undefined
  Profile: undefined
}

const Stack = createStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  const userContext = useUserContext()

  return (
    <Stack.Navigator
      initialRouteName={userContext?.token !== undefined ? 'Menu' : 'Login'}
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
      {userContext?.token !== undefined ? (
        <Stack.Screen
          name="Menu"
          component={MenuNavigator}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
        />
      ) : (
        <>
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
        </>
      )}

      <Stack.Screen
        name="Profile"
        component={Profile}
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <Image
        //       tintColor={focused ? '#fff' : '#aebacb'}
        //       source={TherapyIcon}
        //       alt="therapy_icon"
        //     />
        //   ),
        //   tabBarLabel: 'Pefil',
        //   tabBarvisibi
        // }}
      />
    </Stack.Navigator>
  )
}

export type RootScreenProps<T extends keyof RootStackScreens> =
  StackScreenProps<RootStackScreens, T>

export default MainNavigator
