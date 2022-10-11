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
    <Component flex={1}>
      <VStack
        flex={1}
        borderColor="#949494"
        borderTopWidth={dividerThickness}
        borderBottomWidth={dividerThickness}
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
