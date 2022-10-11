import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import { Box, Image } from 'native-base'
import { ImageSourcePropType } from 'react-native'
import { CustomIconButton } from '../components'
import { Diary, Habits, PatientDashboard, Therapy } from '../views'
import theme from '../AppTheme'
import DiaryNavigator from './Diary/DiaryNavigator'

const HomeIcon = require('../../assets/home.png')
const DiaryIcon = require('../../assets/diary.png')
const TherapyIcon = require('../../assets/therapist.png')
const HabitsIcon = require('../../assets/sync.png')

const Profile: ImageSourcePropType = require('../../assets/profile.png')

type MenuNavigatorScreens = {
  PatientDashboard: undefined
  DiaryStack: undefined
  Therapy: undefined
  Habits: undefined
}

const Tab = createBottomTabNavigator<MenuNavigatorScreens>()

const MenuNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="DiaryStack"
      screenOptions={{
        headerTitle: '',
        headerStyle: { borderWidth: 0 },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary.default,
          height: 80,
        },
        tabBarLabelStyle: { fontSize: 16 },
        tabBarItemStyle: { paddingVertical: 10 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aebacb',
      }}
    >
      <Tab.Screen
        name="PatientDashboard"
        component={PatientDashboard}
        options={{
          headerRight: () => (
            <Box>
              <CustomIconButton icon={Profile} pr={'5'} />
            </Box>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              tintColor={focused ? '#fff' : '#aebacb'}
              source={HomeIcon}
              alt="home_icon"
            />
          ),
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen
        name="DiaryStack"
        component={DiaryNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              tintColor={focused ? '#fff' : '#aebacb'}
              source={DiaryIcon}
              alt="diary_icon"
            />
          ),
          headerShown: false,
          tabBarLabel: 'Diario',
        }}
      />
      <Tab.Screen
        name="Therapy"
        component={Therapy}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              tintColor={focused ? '#fff' : '#aebacb'}
              source={TherapyIcon}
              alt="therapy_icon"
            />
          ),
          tabBarLabel: 'Terapia',
        }}
      />
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              tintColor={focused ? '#fff' : '#aebacb'}
              source={HabitsIcon}
              alt="habits_icon"
            />
          ),
          tabBarLabel: 'Hábitos',
        }}
      />
    </Tab.Navigator>
  )
}

export type MenuScreenProps<T extends keyof MenuNavigatorScreens> =
  BottomTabScreenProps<MenuNavigatorScreens, T>

export default MenuNavigator
