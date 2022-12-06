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
import { DiaryEntry } from '../../models'
import { headerStyle } from '../MenuNavigator'

export type DiaryStackScreens = {
  Diary: undefined
  EntryDetailed: {
    entry?: DiaryEntry
    // selectedFeelingsData?: string[]
    // selectedSymptomsData?: string[]
    // descriptionData?: string
  }
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
          ...headerStyle,
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
