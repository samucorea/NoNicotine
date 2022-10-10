import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import { Box, Image } from 'native-base'
import { ImageSourcePropType } from 'react-native'
import { CustomIconButton } from '../components'
import { Diary, Habits, PatientDashboard, Therapy } from '../views'
import theme from '../AppTheme'

const HomeIcon = require('../../assets/home.png')
const DiaryIcon = require('../../assets/diary.png')
const TherapyIcon = require('../../assets/therapist.png')
const HabitsIcon = require('../../assets/sync.png')

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
      initialRouteName="Diary"
      screenOptions={{
        headerTitle: '',
        headerTitleStyle: { color: theme.colors.primary.default },
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
        name="Diary"
        component={Diary}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              tintColor={focused ? '#fff' : '#aebacb'}
              source={DiaryIcon}
              alt="diary_icon"
            />
          ),
          headerShown: true,
          headerTitle: 'Entradas',
          headerTitleStyle: { fontSize: 28 },
          tabBarLabel: 'Diario',
          headerStyle: { height: 120 },
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
