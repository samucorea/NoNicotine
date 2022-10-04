import React from 'react'
import { Pressable, Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'

interface buttonInterface {
  buttonContent: string
  onPress?: () => void
}

export const SendButton = (props: buttonInterface): JSX.Element => {
  const colors = useColorModeValue(
    theme.colors.primary.default,
    theme.colors.primary.light
  )

  return (
    <Pressable
      onPress={props.onPress}
      alignSelf="center"
      justifyContent="center"
      backgroundColor={colors}
      borderRadius="30px"
      width="160px"
      height="50px"
      marginTop="25px"
    >
      <Text alignSelf="center" fontSize="16px" fontWeight="600" color="#FFFFFF">
        {props.buttonContent}
      </Text>
    </Pressable>
  )
}
