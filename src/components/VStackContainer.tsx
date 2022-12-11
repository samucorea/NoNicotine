import { Box, Divider, ScrollView, VStack } from 'native-base'
import React, { FC, ReactNode } from 'react'

interface Props {
  dividerThickness?: number
  children: ReactNode
  scroll?: boolean
}

const VStackContainer: FC<Props> = ({
  children,
  dividerThickness = 1.5,
  scroll = true,
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
      >
        {children}
      </VStack>
    </Component>
  )
}

export default VStackContainer
