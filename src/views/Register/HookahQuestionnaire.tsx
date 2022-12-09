import React from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, HStack, VStack } from 'native-base'

import {
  ScreenHeader,
  RegularText,
  InputField,
  SendButton,
  ScreenContainer,
} from '../../components'
import { Formik } from 'formik'
import hookahService from '../../services/hookahService'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'
import { number, object } from 'yup'

const HookahQuestionnaire: React.FC<RootScreenProps<'HookahQuestionnaire'>> = ({
  navigation,
  route: {
    params: { nextQuestionnaires, edit },
  },
}) => {
  const { user: patient } = useUserContext<PatientContextProps>() ?? {}

  const handleDelete = () => {}

  return (
    <ScreenContainer>
      <VStack space={5} h="full">
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title="Consumo de hookah" />
          <RegularText>
            {'Por favor, completa la siguiente información'}
          </RegularText>
        </Box>
        <Formik
          initialValues={{
            daysPerWeek: 0,
            setupPrice: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data) => {
            console.log(
              '🚀 ~ file: HookahQuestionnaire.tsx ~ line 44 ~ onSubmit={ ~ data',
              data
            )
            await hookahService.create({
              ...data,
              patientConsumptionMethodsId:
                patient!.patientConsumptionMethodsId!,
            })

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
                {'¿Por lo general, cuántos días fumas hookah en una semana?'}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="daysPerWeek"
                placeholder="Número"
              />
              <RegularText>
                {'¿Cuánto te cuesta usualmente preparar una hookah?'}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="setupPrice"
                placeholder="RD$ 0.00"
              />
              <HStack
                position={'absolute'}
                bottom={20}
                justifyContent="space-evenly"
                w="full"
              >
                {edit && (
                  <SendButton
                    text="Eliminar"
                    onPress={() => handleDelete()}
                    w="45%"
                    bg="#ef756d"
                  />
                )}
                <SendButton
                  text={edit ? 'Guardar' : 'Continuar'}
                  onPress={() => handleSubmit()}
                  w="45%"
                />
              </HStack>
            </>
          )}
        </Formik>
      </VStack>
    </ScreenContainer>
  )
}

const validationSchema = object({
  daysPerWeek: number().required(),
  setupPrice: number().required(),
})

export default HookahQuestionnaire
