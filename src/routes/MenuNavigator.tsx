import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import { Image } from 'native-base'
import { CustomIconButton } from '../components'
import { Habits, PatientDashboard, TherapistDashboard, Therapy } from '../views'
import theme from '../AppTheme'
import DiaryNavigator from './Diary/DiaryNavigator'
import { useLoadingContext } from '../contexts/LoadingContext'
import { useEffect } from 'react'
import { PatientContextProps, useUserContext } from '../contexts/UserContext'
import Profile from '../../assets/profile.svg'
import { Roles } from '../utils/enums/Roles'
import { headerStyle } from '../utils/headerStyle'
// import ChatHubProvider from '../contexts/ChatHubContext'

const HomeIcon = require('../../assets/home.png')
const DiaryIcon = require('../../assets/diary.png')
const TherapyIcon = require('../../assets/therapist.png')
const HabitsIcon = require('../../assets/sync.png')

export type MenuNavigatorScreens = {
  PatientDashboard: undefined
  DiaryStack: undefined
  Therapy: undefined
  Habits: undefined
  Profile: undefined
  TherapistDashboard: undefined
}

const Tab = createBottomTabNavigator<MenuNavigatorScreens>()

const MenuNavigator = () => {
  const loadingContext = useLoadingContext()
  const { user } = useUserContext<PatientContextProps>() ?? {}

  useEffect(() => {
    loadingContext?.setLoading(false)
  }, [])

  return (
    <Tab.Navigator
      initialRouteName={
        user?.role == Roles.patient ? 'PatientDashboard' : 'TherapistDashboard'
      }
      screenOptions={{
        headerTitle: '',
        tabBarStyle: {
          backgroundColor: theme.colors.primary.default,
          height: 80,
        },
        tabBarLabelStyle: { fontSize: 16 },
        tabBarItemStyle: { paddingVertical: 10 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aebacb',
        headerStyle: { height: 120 },
      }}
    >
      {user?.role == Roles.patient ? (
        <>
          <Tab.Screen
            name="PatientDashboard"
            component={PatientDashboard}
            options={({ navigation }) => ({
              headerRight: () => (
                <CustomIconButton
                  icon={Profile}
                  pr={'5'}
                  onPress={() => navigation.navigate('Profile')}
                />
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  tintColor={focused ? '#fff' : '#aebacb'}
                  source={HomeIcon}
                  alt="home_icon"
                />
              ),
              tabBarLabel: 'Inicio',
              ...headerStyle,
            })}
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
              headerTitle: 'Hábitos saludables',
              headerStyle: {
                height: 120,
                borderBottomWidth: 1,
                borderBottomColor: '#949494',
              },
              headerTitleStyle: {
                color: theme.colors.primary.default,
                fontSize: 28,
              },
            }}
          />
          <Tab.Screen
            name="Therapy"
            component={Therapy}
            options={({ navigation }) => ({
              tabBarIcon: ({ focused }) => (
                <Image
                  tintColor={focused ? '#fff' : '#aebacb'}
                  source={TherapyIcon}
                  alt="therapy_icon"
                />
              ),
              tabBarLabel: 'Terapia',
              headerTitle: user?.therapist?.name,
              headerStyle: {
                height: 120,
                borderBottomWidth: 1,
                borderBottomColor: '#949494',
              },
              // headerShown: user?.therapist != undefined,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.primary.default,
                fontSize: 28,
              },
            })}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="TherapistDashboard"
            component={TherapistDashboard}
            options={({ navigation }) => ({
              headerRight: () => (
                <CustomIconButton
                  icon={Profile}
                  pr={'5'}
                  onPress={() => navigation.navigate('Profile')}
                />
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  tintColor={focused ? '#fff' : '#aebacb'}
                  source={HomeIcon}
                  alt="home_icon"
                />
              ),
              headerTitle: 'Pacientes',
              tabBarLabel: 'Inicio',
              ...headerStyle,
            })}
          />
        </>
      )}

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
    </Tab.Navigator>
  )
}

export type MenuScreenProps<T extends keyof MenuNavigatorScreens> =
  BottomTabScreenProps<MenuNavigatorScreens, T>

export default MenuNavigator
