import { Box, Container } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ScreenContainer: FC<Props & InterfaceBoxProps> = ({
  children,
  ...props
}) => {
  return (
    <Box flex={1} alignItems="center" {...props}>
      <Container flex={1} w="100%" bg={props.bg}>
        {children}
      </Container>
    </Box>
  )
}

export default ScreenContainer
