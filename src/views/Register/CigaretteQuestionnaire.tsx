import React, { useState } from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, Radio, VStack, Text, ScrollView } from 'native-base'
import theme from '../../AppTheme'
import formatMoney from '../../utils/formatMoney'
import {
  ScreenHeader,
  RegularText,
  InputField,
  SendButton,
  ScreenContainer,
  RadioInput,
} from '../../components'
import { Formik } from 'formik'

const CigaretteQuestionnaire: React.FC<
  RootScreenProps<'CigaretteQuestionnaire'>
> = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.navigate('Menu')
  }

  const [Size, setSize] = useState('')

  const spacing = 3

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={spacing}>
          <Box alignItems="flex-start">
            <ScreenHeader
              title="Consumo de cigarrillo"
              alignSelf={'flex-start'}
            />
            <RegularText color={theme.colors.subText.primary}>
              {'Por favor, completa la siguiente información'}
            </RegularText>
          </Box>
          <Formik
            initialValues={{
              cigarsPerDay: '',
              daysPerWeek: '',
              boxSize: '',
              boxPrice: 0,
            }}
            onSubmit={() => {}}
          >
            {({ handleSubmit, values }) => (
              <VStack space={spacing}>
                <InputField
                  keyboardType="numeric"
                  label="¿Cuántos cigarrillos fumas, en promedio, por día?"
                  labelStyle={{
                    _text: {
                      fontSize: 'md',
                      color: theme.colors.primary.default,
                      bold: true,
                      pb: 2,
                    },
                  }}
                  name="cigarsPerDay"
                  placeholder="Unidad(es)"
                  color={theme.colors.subText.primary}
                  placeholderTextColor={theme.colors.subText.primary}
                />

                <InputField
                  keyboardType="numeric"
                  labelStyle={{
                    _text: {
                      fontSize: 'md',
                      color: theme.colors.primary.default,
                      bold: true,
                      pb: 2,
                    },
                  }}
                  label="¿Por lo general, cuántos días fumas cigarrillo en una semana?"
                  name="daysPerWeek"
                  placeholder="Número"
                  color={theme.colors.subText.primary}
                  placeholderTextColor={theme.colors.subText.primary}
                />

                <RadioInput
                  label="¿De qué tamaño sueles comprar la caja de cigarrillos?"
                  labelStyle={{
                    _text: {
                      fontSize: 'md',
                      color: theme.colors.primary.default,
                      bold: true,
                      pb: 2,
                    },
                  }}
                  name="boxSize"
                  optionStyle={{
                    value: '',
                    _text: { color: theme.colors.subText.primary },
                  }}
                  options={[
                    { key: 'Pequeña (10 unidades)', value: 'S' },
                    { key: 'Grande (20 unidades)', value: 'L' },
                  ]}
                  direction="column"
                />

                <InputField
                  keyboardType="numeric"
                  label="¿Cuánto te cuesta usualmente comprar una caja de cigarrillos?"
                  labelStyle={{
                    _text: {
                      fontSize: 'md',
                      color: theme.colors.primary.default,
                      bold: true,
                      pb: 2,
                    },
                  }}
                  name="boxPrice"
                  placeholder="RD$ 0.00"
                  color={theme.colors.subText.primary}
                  placeholderTextColor={theme.colors.subText.primary}
                />
                <SendButton
                  text="Continuar"
                  onPress={() => handleSubmit()}
                  mb={3}
                />
              </VStack>
            )}
          </Formik>
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

export default CigaretteQuestionnaire
