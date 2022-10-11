import React, { ReactNode } from 'react'
import { Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'

interface RegularTextInterface {
  children: ReactNode
}

export const RegularText = ({
  children,
  fontSize = '14px',
  ...props
}: RegularTextInterface & InterfaceTextProps): JSX.Element => {
  return (
    <Text
      fontSize="14px"
      color={useColorModeValue(
        theme.colors.primary.default,
        theme.colors.primary.light
      )}
      {...props}
    >
      {children}
    </Text>
  )
}