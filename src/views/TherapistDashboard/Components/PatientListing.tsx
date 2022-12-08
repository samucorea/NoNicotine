import React, { FC } from 'react'
import { StackButton } from '../../../components'
import ProfileIcon from '../../../../assets/profile.svg'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MenuNavigatorScreens } from '../../../routes/MenuNavigator'
import { Box } from 'native-base'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackScreens } from '../../../routes/MainNavigator'

interface Props {
  name: string
  lastMessage: string
}

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackScreens>,
  BottomTabNavigationProp<MenuNavigatorScreens, 'TherapistDashboard'>
>

const PatientListing: FC<Props> = ({ name, lastMessage }) => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <StackButton
      onPress={() => navigation.navigate('Chat', { title: name })}
      leftIcon={
        <Box mr={3}>
          <ProfileIcon />
        </Box>
      }
      title={name}
      subTitle={lastMessage}
    />
  )
}

export default PatientListing
