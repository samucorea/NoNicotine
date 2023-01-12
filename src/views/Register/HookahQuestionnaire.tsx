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
import { useTranslation } from 'react-i18next'

const HookahQuestionnaire: React.FC<RootScreenProps<'HookahQuestionnaire'>> = ({
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
          <ScreenHeader title={t('methodsQuestionnaires.hookah.title')!} />
          <RegularText>
            {t('methodsQuestionnaires.hookah.subTitle')!}
          </RegularText>
        </Box>
        <Formik
          initialValues={{
            daysPerWeek: edit
              ? (patient?.patientConsumptionMethods?.hookahDetails
                  ?.daysPerWeek as number)
              : 0,
            setupPrice: edit
              ? (patient?.patientConsumptionMethods?.hookahDetails
                  ?.setupPrice as number)
              : 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data) => {
            const service = edit
              ? async (data: any) => await hookahService.update(data)
              : async (data: any) => await hookahService.create(data)

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
              {console.log(values)}
              <RegularText>
                {t('methodsQuestionnaires.hookah.labels.daysPerWeek')!}
              </RegularText>
              <InputField
                keyboardType="numeric"
                name="daysPerWeek"
                placeholder="Número"
              />
              <RegularText>
                {t('methodsQuestionnaires.hookah.labels.price')!}
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
  daysPerWeek: number().required(),
  setupPrice: number().required(),
})

export default HookahQuestionnaire
