import { Text } from 'native-base'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'
import React, { FC, ReactNode } from 'react'

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
      color={type == 'error' ? '#d82728' : 'green.400'}
      fontSize="md"
      {...textProps}
    >
      {children}
    </Text>
  )
}

export default SubmitMessage
