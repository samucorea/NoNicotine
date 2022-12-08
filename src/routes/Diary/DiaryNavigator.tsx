import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack'
import { Diary, EntryDetailed, Patients } from '../../views'
import Ionicons from '@expo/vector-icons/Ionicons'

import { Icon, useColorModeValue } from 'native-base'
import theme from '../../AppTheme'
import { DiaryEntry } from '../../models'
import { headerStyle } from '../../utils/headerStyle'
import { useUserContext } from '../../contexts/UserContext'
import { Roles } from '../../utils/enums/Roles'

export type DiaryStackScreens = {
  Diary: {
    patientName?: string
    patientId?: string
  }
  EntryDetailed: {
    entry?: DiaryEntry
    // selectedFeelingsData?: string[]
    // selectedSymptomsData?: string[]
    // descriptionData?: string
  }
  Patients: undefined
}

const Stack = createStackNavigator<DiaryStackScreens>()

const DiaryNavigator = () => {
  const { user } = useUserContext() ?? {}

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
      {user?.role == Roles.therapist && (
        <Stack.Screen
          name="Patients"
          component={Patients}
          options={{
            headerTitle: 'Pacientes',
            ...headerStyle,
          }}
        />
      )}
      <Stack.Screen
        name="Diary"
        component={Diary}
        options={({
          route: {
            params: { patientName },
          },
        }) => ({
          headerTitle: `Entradas${patientName && ' - ' + patientName}`,
          ...headerStyle,
        })}
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

export default DiaryNavigator
