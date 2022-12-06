import { Spinner, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import theme from '../AppTheme'

interface Props {
  message?: string
}

const Loading: FC<Props> = ({ message }) => {
  return (
    <VStack
      position={'absolute'}
      w="full"
      h="full"
      zIndex={10}
      justifyContent={'center'}
      alignItems={'center'}
      space={2}
    >
      <Spinner size="lg" color={theme.colors.primary.default} />
      <Text color={theme.colors.primary.default} fontSize="lg">
        {message !== undefined ? message : 'Cargando'}
      </Text>
    </VStack>
  )
}

export default Loading
