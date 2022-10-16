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
import { Formik } from 'formik'

const CigarQuestionnaire: React.FC<RootScreenProps<'CigarQuestionnaire'>> = ({
  navigation,
}) => {
  const handleSubmit = () => {
    navigation.navigate('Menu')
  }

  return (
    <ScreenContainer>
      <VStack space={5}>
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title="Consumo de cigarro" />
        </Box>

        <Formik
          initialValues={{
            cigarsPerDay: '',
            daysPerWeek: '',
            cigarsPerBox: '',
            boxPrice: '',
          }}
          onSubmit={() => {}}
        >
          {({ handleSubmit }) => (
            <>
              <RegularText>
                {'¿Cuántos cigarros fumas, en promedio, por día?'}
              </RegularText>
              <InputField name="cigarsPerDay" placeholder="Unidad(es)" />
              <RegularText>
                {'¿Por lo general, cuántos días fumas cigarro en una semana?'}
              </RegularText>
              <InputField name="daysPerWeek" placeholder="Número" />
              <RegularText>
                {'¿Cuántos cigarros suelen traer las cajas que compras?'}
              </RegularText>
              <InputField name="cigarsPerBox" placeholder="Unidad(es)" />
              <RegularText>
                {'¿Cuánto te cuesta usualmente comprar una caja de cigarros?'}
              </RegularText>
              <InputField name="boxPrice" placeholder="RD$ 0.00" />
              <SendButton text="Continuar" onPress={() => handleSubmit()} />
            </>
          )}
        </Formik>
      </VStack>
    </ScreenContainer>
  )
}

export default CigarQuestionnaire
