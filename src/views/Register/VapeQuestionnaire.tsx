import React from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, VStack } from 'native-base'

import {
  ScreenHeader,
  RegularText,
  InputField,
  SendButton,
  ScreenContainer,
} from '../../components'

const VapeQuestionnaire: React.FC<RootScreenProps<'VapeQuestionnaire'>> = ({
  navigation,
}) => {
  const handleSubmit = () => {
    navigation.navigate('MethodSelection')
  }

  return (
    <ScreenContainer>
      <VStack space={5}>
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title="Consumo de cigarrillo electrónico" />
          <RegularText>
            {'Por favor, completa la siguiente información'}
          </RegularText>
        </Box>
        <RegularText>
          {'¿Cuántos días, en promedio, te dura un pod/vape desechable?'}
        </RegularText>
        <InputField placeholder="Número" />
        <RegularText>
          {
            '¿Cuántos pods suelen traer las cajas que compras? Si compras vapes desechables, coloca un 1'
          }
        </RegularText>
        <InputField placeholder="Unidad(es)" />
        <RegularText>
          {
            '¿Cuánto te cuesta usualmente comprar una caja de pods o un vape desechable?'
          }
        </RegularText>
        <InputField placeholder="RD$ 0.00" />
        <SendButton text="Continuar" onPress={handleSubmit} />
      </VStack>
    </ScreenContainer>
  )
}

export default VapeQuestionnaire
