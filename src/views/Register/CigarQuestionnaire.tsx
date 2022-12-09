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
import { number, object } from 'yup'
import cigarService from '../../services/cigarService'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'

const CigarQuestionnaire: React.FC<RootScreenProps<'CigarQuestionnaire'>> = ({
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
          <ScreenHeader title="Consumo de cigarro" />
        </Box>

        <Formik
          initialValues={{
            unitsPerDay: 0,
            daysPerWeek: 0,
            unitsPerBox: 0,
            boxPrice: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data) => {
            await cigarService.create({
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
                {'¿Cuántos cigarros fumas, en promedio, por día?'}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="cigarsPerDay"
                placeholder="Unidad(es)"
              />
              <RegularText>
                {'¿Por lo general, cuántos días fumas cigarro en una semana?'}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="daysPerWeek"
                placeholder="Número"
              />
              <RegularText>
                {'¿Cuántos cigarros suelen traer las cajas que compras?'}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="cigarsPerBox"
                placeholder="Unidad(es)"
              />
              <RegularText>
                {'¿Cuánto te cuesta usualmente comprar una caja de cigarros?'}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="boxPrice"
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
  unitsPerDay: number().required(),
  unitsPerBox: number().required(),
  daysPerWeek: number().required(),
  boxPrice: number().required(),
})

export default CigarQuestionnaire
