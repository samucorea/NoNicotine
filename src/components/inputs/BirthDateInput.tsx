import React from 'react'
import {
  Box,
  Text,
  Input,
  useColorModeValue,
  VStack,
  HStack,
} from 'native-base'
import { Dimensions } from 'react-native'
import theme from '../../AppTheme'

export const BirthDateInput = (): JSX.Element => {
  const colors = useColorModeValue('#94a4ba', theme.colors.primary.light)

  return (
    <>
      <Text pl={3} pb={1} color={theme.colors.primary.default} fontSize="16px">
        Fecha de nacimiento
      </Text>
      <HStack space={2}>
        <Input
          w="20%"
          fontSize={15}
          variant="date"
          borderColor={colors}
          placeholderTextColor={colors}
          placeholder="dd"
        />
        <Input
          w="20%"
          fontSize={15}
          variant="date"
          borderColor={colors}
          placeholderTextColor={colors}
          placeholder="mm"
        />
        <Input
          w="25%"
          fontSize={15}
          variant="date"
          borderColor={colors}
          placeholderTextColor={colors}
          placeholder="aaaa"
        />
      </HStack>
    </>
  )
}
