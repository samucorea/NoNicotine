import { Text } from 'native-base'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'
import React, { FC, ReactNode } from 'react'
import theme from '../AppTheme'

interface Props {
  children: ReactNode
  type: 'success' | 'error'
}

const SubmitMessage: FC<Props & InterfaceTextProps> = ({
  children,
  type,
  ...textProps
}) => {
  return (
    <Text
      color={type == 'error' ? '#d82728' : theme.colors.primary.default}
      fontSize="md"
      {...textProps}
    >
      {children}
    </Text>
  )
}

export default SubmitMessage
