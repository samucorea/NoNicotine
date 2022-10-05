import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import { Box } from 'native-base'
import { ImageSourcePropType } from 'react-native'
import { CustomIconButton } from '../components'
import { Diary, Habits, PatientDashboard, Therapy } from '../views'

const Profile: ImageSourcePropType = require('../../assets/profile.png')

export type MenuNavigatorScreens = {
  PatientDashboard: undefined
  Diary: undefined
  Therapy: undefined
  Habits: undefined
}

const Tab = createBottomTabNavigator<MenuNavigatorScreens>()

const MenuNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
        tabBarIcon: (props) => (
          <Box bg="#000" height={'3'} width={'3'} rounded="full"></Box>
        ),
      }}
    >
      <Tab.Screen
        name="PatientDashboard"
        component={PatientDashboard}
        options={{
          headerRight: () => <CustomIconButton icon={Profile} />,
        }}
      />
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="Therapy" component={Therapy} />
      <Tab.Screen name="Habits" component={Habits} />
    </Tab.Navigator>
  )
}

export type MenuScreenProps<T extends keyof MenuNavigatorScreens> =
  BottomTabScreenProps<MenuNavigatorScreens, T>

export default MenuNavigator
