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
    params: { nextQuestionnaires, edit, add },
  },
}) => {
  const { user: patient, refetchUser } =
    useUserContext<PatientContextProps>() ?? {}

  return (
    <ScreenContainer>
      <VStack space={5} h="full">
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title="Consumo de cigarro" />
        </Box>

        <Formik
          initialValues={{
            unitsPerDay: edit
              ? patient?.patientConsumptionMethods?.cigarDetails?.unitsPerDay
              : 0,
            daysPerWeek: edit
              ? patient?.patientConsumptionMethods?.cigarDetails?.daysPerWeek
              : 0,
            unitsPerBox: edit
              ? patient?.patientConsumptionMethods?.cigarDetails?.unitsPerBox
              : 0,
            boxPrice: edit
              ? patient?.patientConsumptionMethods?.cigarDetails?.boxPrice
              : 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data) => {
            console.log(
              '🚀 ~ file: CigarQuestionnaire.tsx:52 ~ onSubmit={ ~ data',
              data
            )
            try {
              const service = edit
                ? async (data: any) => await cigarService.update(data)
                : async (data: any) => await cigarService.create(data)

              await service({
                ...data,
                patientConsumptionMethodsId:
                  patient!.patientConsumptionMethodsId!,
              })

              if (nextQuestionnaires.length > 0) {
                return navigation.navigate(nextQuestionnaires.pop() as any, {
                  nextQuestionnaires,
                })
              }

              await refetchUser()

              navigation.navigate('MethodSelection', { firstTime: false })
            } catch (error: any) {
              console.log(error.response.data)
            }
          }}
        >
          {({ handleSubmit }) => (
            <>
              <RegularText>
                {'¿Cuántos cigarros fumas, en promedio, por día?'}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="unitsPerDay"
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
                name="unitsPerBox"
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
                <SendButton
                  text={edit ? 'Guardar' : add ? 'Agregar' : 'Continuar'}
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
