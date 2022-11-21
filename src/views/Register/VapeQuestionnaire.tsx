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

const VapeQuestionnaire: React.FC<RootScreenProps<'VapeQuestionnaire'>> = ({
  navigation,
  route: {
    params: { nextQuestionnaires },
  },
}) => {
  return (
    <ScreenContainer>
      <VStack space={5}>
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title="Consumo de cigarrillo electrónico" />
          <RegularText>
            {'Por favor, completa la siguiente información'}
          </RegularText>
        </Box>

        <Formik
          initialValues={{
            daysPerPod: '',
            daysPerWeek: '',
            boxSize: '',
            boxPrice: '',
            podsPerBox: '',
          }}
          onSubmit={() => {
            if (nextQuestionnaires.length > 0) {
              return navigation.navigate(nextQuestionnaires.pop() as any, {
                nextQuestionnaires,
              })
            }

            navigation.navigate('Menu')
          }}
        >
          {({ handleSubmit }) => (
            <>
              <RegularText>
                {'¿Cuántos días, en promedio, te dura un pod/vape desechable?'}
              </RegularText>
              <InputField name="daysPerPod" placeholder="Número" />
              <RegularText>
                {
                  '¿Cuántos pods suelen traer las cajas que compras? Si compras vapes desechables, coloca un 1'
                }
              </RegularText>
              <InputField name="podsPerBox" placeholder="Unidad(es)" />
              <RegularText>
                {
                  '¿Cuánto te cuesta usualmente comprar una caja de pods o un vape desechable?'
                }
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

export default VapeQuestionnaire
