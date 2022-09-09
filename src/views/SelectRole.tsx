import React from 'react'
import { Box } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackScreens } from '../routes/MainNavigator'

type Props = NativeStackScreenProps<RootStackScreens, 'SelectRole'>

const SelectRole: React.FC<Props> = () => {
  return <Box>SelectRole</Box>
}

export default SelectRole
