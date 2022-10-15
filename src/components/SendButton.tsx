import React from 'react'
import { Pressable, Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types'

interface Props {
  text: string
  onPress?: () => void
}

export const SendButton = ({
  text,
  onPress,
  ...props
}: Props & InterfacePressableProps): JSX.Element => {
  const colors = useColorModeValue(
    theme.colors.primary.default,
    theme.colors.primary.light
  )

  return (
    <Pressable
      onPress={onPress}
      alignSelf="center"
      justifyContent="center"
      backgroundColor={colors}
      rounded="30px"
      width="160px"
      height="50px"
      marginTop="8px"
      {...props}
    >
      <Text alignSelf="center" fontSize="16px" fontWeight="600" color="#FFFFFF">
        {text}
      </Text>
    </Pressable>
  )
}
