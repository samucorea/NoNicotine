import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack'
import { Diary, EntryDetailed } from '../../views'
import Ionicons from '@expo/vector-icons/Ionicons'

import { Icon, useColorModeValue } from 'native-base'
import theme from '../../AppTheme'

export type DiaryStackScreens = {
  Diary: undefined
  EntryDetailed: { entryId?: number }
}

const Stack = createStackNavigator<DiaryStackScreens>()

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: '',
        headerBackImage: () => (
          <Icon
            as={Ionicons}
            name="close"
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
        name="Diary"
        component={Diary}
        options={{
          headerTitle: 'Entradas',
          headerStyle: { height: 120 },
          headerTitleStyle: {
            color: theme.colors.primary.default,
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name="EntryDetailed"
        component={EntryDetailed}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  )
}

export type DiaryScreenProps<T extends keyof DiaryStackScreens> =
  StackScreenProps<DiaryStackScreens, T>

export default MainNavigator