import { Image, VStack, Text } from 'native-base'
import React from 'react'
import theme from '../../../AppTheme'
import { ScreenContainer } from '../../../components'
const UnlinkedIcon = require('../../../../assets/caritatriste.png')

const Unlinked = () => {
  return (
    <VStack
      alignSelf="center"
      alignItems="center"
      alignContent="center"
      bg={'transparent'}
      height={'100%'}
      position="absolute"
      flex={1}
      justifyContent="center"
      paddingX={24}
    >
      <Image
        source={UnlinkedIcon}
        alt="Unlinked_Icon"
        alignSelf="center"
      ></Image>
      <Text fontSize={28} color={theme.colors.primary.default}>
        Lo sentimos...
      </Text>
      <Text
        fontSize={16}
        color={theme.colors.primary.default}
        textAlign="center"
      >
        Debes estar vinculado a un terapeuta para acceder a esta pestaña
      </Text>
    </VStack>
  )
}

export default Unlinked
