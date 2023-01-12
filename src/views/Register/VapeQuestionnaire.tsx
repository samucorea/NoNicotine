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
import vapeService from '../../services/vapeService'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'
import { useTranslation } from 'react-i18next'

const VapeQuestionnaire: React.FC<RootScreenProps<'VapeQuestionnaire'>> = ({
  navigation,
  route: {
    params: { nextQuestionnaires, edit, add },
  },
}) => {
  const { user: patient, refetchUser } =
    useUserContext<PatientContextProps>() ?? {}

  const { t } = useTranslation()
  return (
    <ScreenContainer>
      <VStack space={5} h="full">
        <Box alignSelf="flex-start" display="flex">
          <ScreenHeader title={t('methodsQuestionnaires.vape.title')!} />
          <RegularText>{t('methodsQuestionnaires.vape.subTitle')!}</RegularText>
        </Box>

        <Formik
          initialValues={{
            cartridgeLifespan: edit
              ? (patient?.patientConsumptionMethods?.electronicCigaretteDetails
                  ?.cartridgeLifespan as number)
              : 0,
            unitsPerBox: edit
              ? (patient?.patientConsumptionMethods?.electronicCigaretteDetails
                  ?.unitsPerBox as number)
              : 0,
            boxPrice: edit
              ? (patient?.patientConsumptionMethods?.electronicCigaretteDetails
                  ?.boxPrice as number)
              : 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data) => {
            const service = edit
              ? async (data: any) => await vapeService.update(data)
              : async (data: any) => await vapeService.create(data)

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
          }}
        >
          {({ handleSubmit, values }) => (
            <>
              <RegularText>
                {t('methodsQuestionnaires.vape.labels.daysLast')!}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="cartridgeLifespan"
                placeholder="Número"
              />
              <RegularText>
                {t('methodsQuestionnaires.vape.labels.podsAmount')!}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="unitsPerBox"
                placeholder="Unidad(es)"
              />
              <RegularText>
                {t('methodsQuestionnaires.vape.labels.price')!}
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
                  text={
                    edit
                      ? t('methodsQuestionnaires.sendButton.edit')!
                      : add
                      ? t('methodsQuestionnaires.sendButton.add')!
                      : t('methodsQuestionnaires.sendButton.continue')!
                  }
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
  cartridgeLifespan: number().required(),
  unitsPerBox: number().required(),
  boxPrice: number().required(),
})

export default VapeQuestionnaire
