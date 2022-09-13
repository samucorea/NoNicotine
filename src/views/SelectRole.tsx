import React from 'react'
import { Box, Text } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackScreens } from '../routes/MainNavigator'

type Props = NativeStackScreenProps<RootStackScreens, 'SelectRole'>

const SelectRole: React.FC<Props> = () => {
  return (
    <Box>
      <Text>SelectRoHolale</Text>
    </Box>
  )
}

export default SelectRole
