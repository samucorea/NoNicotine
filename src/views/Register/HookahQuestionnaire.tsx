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

const HookahQuestionnaire: React.FC<RootScreenProps<'HookahQuestionnaire'>> = ({
  navigation,
}) => {
  const handleSubmit = () => {
    navigation.navigate('MethodSelection')
  }

  return (
    <ScreenContainer>
      <VStack space={5}>
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title="Consumo de hookah" />
          <RegularText>
            {'Por favor, completa la siguiente información'}
          </RegularText>
        </Box>
        <RegularText>
          {'¿Por lo general, cuántos días fumas hookah en una semana?'}
        </RegularText>
        <InputField placeholder="Número" />
        <RegularText>
          {'¿Cuánto te cuesta usualmente preparar una hookah?'}
        </RegularText>
        <InputField placeholder="RD$ 0.00" />
        <SendButton text="Continuar" onPress={handleSubmit} />
      </VStack>
    </ScreenContainer>
  )
}

export default HookahQuestionnaire
