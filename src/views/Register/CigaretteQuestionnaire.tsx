import React, { useState } from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, Radio, VStack, Text } from 'native-base'
import theme from '../../AppTheme'

import {
  ScreenHeader,
  RegularText,
  InputField,
  SendButton,
  ScreenContainer,
} from '../../components'

const CigaretteQuestionnaire: React.FC<
  RootScreenProps<'CigaretteQuestionnaire'>
> = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.navigate('MethodSelection')
  }

  const [Size, setSize] = useState('')

  return (
    <ScreenContainer>
      <VStack space={5}>
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title="Consumo de cigarrillo" />
          <RegularText>
            {'Por favor, completa la siguiente información'}
          </RegularText>
        </Box>
        <RegularText>
          {'¿Cuántos cigarrillos fumas, en promedio, por día?'}
        </RegularText>
        <InputField placeholder="Unidad(es)" />
        <RegularText>
          {'¿Por lo general, cuántos días fumas cigarrillo en una semana?'}
        </RegularText>
        <InputField placeholder="Número" />
        <RegularText>
          {'¿De qué tamaño sueles comprar la caja de cigarrillos?'}
        </RegularText>
        <Radio.Group
          name="SizeGroup"
          value={Size}
          onChange={(nextValue) => {
            setSize(nextValue)
          }}
        >
          <Radio value="S" my="1">
            <Text color={theme.colors.primary.default} fontSize="16px">
              {'Pequeña (10 unidades)'}
            </Text>
          </Radio>
          <Radio value="L" my="1">
            <Text color={theme.colors.primary.default} fontSize="16px">
              {'Grande (20 unidades)'}
            </Text>
          </Radio>
        </Radio.Group>
        <RegularText>
          {'¿Cuánto te cuesta usualmente comprar una caja de cigarrillos?'}
        </RegularText>
        <InputField placeholder="RD$ 0.00" />
        <SendButton text="Continuar" onPress={handleSubmit} />
      </VStack>
    </ScreenContainer>
  )
}

export default CigaretteQuestionnaire
