import { Box, Container, IContainerProps } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  containerProps?: InterfaceBoxProps<IContainerProps>
}

const ScreenContainer: FC<Props & InterfaceBoxProps> = ({
  children,
  containerProps,
  ...props
}) => {
  return (
    <Box flex={1} alignItems="center" {...props}>
      <Container flex={1} w="100%" bg={props.bg} {...containerProps}>
        {children}
      </Container>
    </Box>
  )
}

export default ScreenContainer
