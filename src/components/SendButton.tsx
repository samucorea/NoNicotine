import React from 'react'
import { Pressable, Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types'

interface Props {
  text: string
  onPress?: () => void
  altern?: boolean
}

export const SendButton = ({
  text,
  onPress,
  altern = false,
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
      <Text
        alignSelf="center"
        fontSize="lg"
        fontWeight="600"
        color={altern ? 'primary.default' : '#FFFFFF'}
      >
        {text}
      </Text>
    </Pressable>
  )
}
