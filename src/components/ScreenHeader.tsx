import React from 'react'
import { Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'

interface Props {
  title: string
}

export const ScreenHeader = ({
  title,
  fontSize = '28px',
  ...textProps
}: Props & InterfaceTextProps): JSX.Element => {
  return (
    <Text
      alignSelf="center"
      color={useColorModeValue(
        theme.colors.primary.default,
        theme.colors.primary.light
      )}
      bold
      fontSize={fontSize}
      {...textProps}
    >
      {title}
    </Text>
  )
}
