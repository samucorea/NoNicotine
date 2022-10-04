import React from 'react'
import { Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'

interface RegularTextInterface {
  RegularTextContent: string
}

export const RegularText = (props: RegularTextInterface): JSX.Element => {
  return (
    <Text
      alignSelf="center"
      fontSize="14px"
      color={useColorModeValue(
        theme.colors.primary.default,
        theme.colors.primary.light
      )}
    >
      {props.RegularTextContent}
    </Text>
  )
}
