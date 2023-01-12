import React, { useEffect } from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack'
import {
  SelectRole,
  MethodSelection,
  Register,
  Login,
  Profile,
  ForgotPassword,
  PreviewProfile,
  Chat,
} from '../views'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import MenuNavigator from './MenuNavigator'
import {
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base'
import theme from '../AppTheme'
import { useUserContext } from '../contexts/UserContext'
import CigaretteQuestionnaire from '../views/Register/CigaretteQuestionnaire'
import CigarQuestionnaire from '../views/Register/CigarQuestionnaire'
import HookahQuestionnaire from '../views/Register/HookahQuestionnaire'
import VapeQuestionnaire from '../views/Register/VapeQuestionnaire'
import { CustomIconButton } from '../components'
import SettingsIcon from '../../assets/settings.svg'
import { Roles } from '../utils/enums/Roles'
import ChatHubProvider from '../contexts/ChatHubContext'
import { headerStyle } from '../utils/headerStyle'
import { User } from '../models'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useTranslation } from 'react-i18next'
import { useSettingsContext } from '../contexts/SettingsContext'

export type RootStackScreens = {
  VapeQuestionnaire: {
    nextQuestionnaires: string[]
    edit?: boolean
    add?: boolean
  }
  HookahQuestionnaire: {
    nextQuestionnaires: string[]
    edit?: boolean
    add?: boolean
  }
  CigarQuestionnaire: {
    nextQuestionnaires: string[]
    edit?: boolean
    add?: boolean
  }
  CigaretteQuestionnaire: {
    nextQuestionnaires: string[]
    edit?: boolean
    add?: boolean
  }
  MethodSelection: { firstTime: boolean }
  Register: { role: Roles }
  SelectRole: undefined
  Menu: undefined
  Login: undefined
  Profile: undefined
  PreviewProfile: { user: User }
  ForgotPassword: undefined
  Chat: {
    title: string
    user?: User
  }
}

SplashScreen.preventAutoHideAsync()

const Stack = createStackNavigator<RootStackScreens>()

const MainNavigator = () => {
  const { token, refreshToken, loading, user } = useUserContext() ?? {}
  const { handleLanguageChange } = useSettingsContext() ?? {}

  const { t } = useTranslation()

  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <ChatHubProvider>
      <Stack.Navigator
        initialRouteName={token && refreshToken ? 'Menu' : 'Login'}
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
        {token && user ? (
          <>
            <Stack.Screen
              name="Menu"
              component={MenuNavigator}
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation }) => ({
                ...(user.role == Roles.patient && {
                  headerRight: () => (
                    <HStack>
                      <VStack alignItems={'center'} pr={'5'}>
                        <IconButton
                          icon={
                            <MaterialIcons
                              name="language"
                              color={theme.colors.primary.default}
                              size={30}
                            />
                          }
                          p={0}
                          onPress={handleLanguageChange}
                        />
                      </VStack>
                      <VStack alignItems={'center'} pr={'5'}>
                        <CustomIconButton
                          icon={SettingsIcon}
                          onPress={() => navigation.navigate('MethodSelection')}
                        />
                        <Text color={theme.colors.primary.default}>
                          {t('profile.consumption')!}
                        </Text>
                      </VStack>
                    </HStack>
                  ),
                }),
              })}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={({
                navigation,
                route: {
                  params: { title },
                },
              }) => ({
                ...headerStyle,
                headerTitle: title,
                headerTitleAlign: 'center',
              })}
            />
            <Stack.Screen
              name="PreviewProfile"
              component={PreviewProfile}
              options={({ navigation }) => ({})}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.primary.default,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerLeft: () => (
                  <IconButton
                    icon={
                      <MaterialIcons name="language" color={'#fff'} size={30} />
                    }
                    pl={5}
                    onPress={handleLanguageChange}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerBackImage: () => (
                  <Icon
                    as={Ionicons}
                    name="close"
                    size={'2xl'}
                    color={'#fff'}
                  />
                ),
                headerStyle: {
                  backgroundColor: theme.colors.primary.default,
                },
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />

            <Stack.Screen
              name="SelectRole"
              component={SelectRole}
              options={{
                headerBackImage: () => (
                  <Icon
                    as={Ionicons}
                    name="close"
                    size={'2xl'}
                    color={'#fff'}
                  />
                ),
                headerStyle: {
                  backgroundColor: theme.colors.primary.default,
                },
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
        <Stack.Screen
          name="MethodSelection"
          initialParams={{ firstTime: false }}
          component={MethodSelection}
        />

        <Stack.Screen
          name="CigaretteQuestionnaire"
          initialParams={{ nextQuestionnaires: [] }}
          component={CigaretteQuestionnaire}
        />
        <Stack.Screen
          name="CigarQuestionnaire"
          initialParams={{ nextQuestionnaires: [] }}
          component={CigarQuestionnaire}
        />
        <Stack.Screen
          name="HookahQuestionnaire"
          initialParams={{ nextQuestionnaires: [] }}
          component={HookahQuestionnaire}
        />
        <Stack.Screen
          name="VapeQuestionnaire"
          initialParams={{ nextQuestionnaires: [] }}
          component={VapeQuestionnaire}
        />
      </Stack.Navigator>
    </ChatHubProvider>
  )
}

export type RootScreenProps<T extends keyof RootStackScreens> =
  StackScreenProps<RootStackScreens, T>

export default MainNavigator
