import { Box, Divider, ScrollView, VStack } from 'native-base'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import React, { FC, ReactNode } from 'react'

interface Props {
  dividerThickness?: number
  children: ReactNode
  scroll?: boolean
}

const VStackContainer: FC<Props & InterfaceVStackProps> = ({
  children,
  dividerThickness = 1.5,
  scroll = true,
  ...props
}) => {
  let Component = ScrollView

  if (!scroll) {
    Component = Box
  }

  return (
    <Component flex={1} bg="#fff">
      <VStack
        borderColor="#949494"
        borderTopWidth={dividerThickness}
        borderBottomWidth={dividerThickness}
        bg="#fff"
        flex={1}
        divider={
          <Divider
            orientation="vertical"
            bg="#949494"
            thickness={dividerThickness}
          />
        }
        {...props}
      >
        {children}
      </VStack>
    </Component>
  )
}

export default VStackContainer
