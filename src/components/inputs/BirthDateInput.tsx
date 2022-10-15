import React from 'react'
import { Text, Input, useColorModeValue, HStack } from 'native-base'
import { Dimensions } from 'react-native'
import theme from '../../AppTheme'

export const BirthDateInput = (): JSX.Element => {
  const colors = useColorModeValue(
    theme.colors.primary.default,
    theme.colors.primary.light
  )

  return (
    <>
      <Text alignSelf="baseline" color={colors} fontSize="16px">
        Fecha de nacimiento
      </Text>
      <HStack space={2}>
        <Input
          borderColor={colors}
          borderRadius="10px"
          padding="12px"
          placeholder="dd"
          placeholderTextColor={colors}
          fontSize="18px"
          textAlign="center"
          width={Dimensions.get('window').width * 0.1667}
        ></Input>
        <Input
          borderColor={colors}
          borderRadius="10px"
          padding="12px"
          placeholder="mm"
          placeholderTextColor={colors}
          fontSize="18px"
          textAlign="center"
          width={Dimensions.get('window').width * 0.1667}
        ></Input>
        <Input
          borderColor={colors}
          borderRadius="10px"
          padding="12px"
          placeholder="aaaa"
          placeholderTextColor={colors}
          fontSize="18px"
          textAlign="center"
          width={Dimensions.get('window').width * 0.2083}
        ></Input>
      </HStack>
    </>
  )
}
