import React from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, VStack, ScrollView, HStack } from 'native-base'
import theme from '../../AppTheme'
import {
  ScreenHeader,
  RegularText,
  InputField,
  SendButton,
  ScreenContainer,
  RadioInput,
} from '../../components'
import { Formik } from 'formik'
import { number, object } from 'yup'
import cigarreteService from '../../services/cigarreteService'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'
import { useTranslation } from 'react-i18next'

const CigaretteQuestionnaire: React.FC<
  RootScreenProps<'CigaretteQuestionnaire'>
> = ({
  navigation,
  route: {
    params: { nextQuestionnaires, edit, add },
  },
}) => {
  const { user: patient, refetchUser } =
    useUserContext<PatientContextProps>() ?? {}

  const spacing = 3

  const { t } = useTranslation()

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={spacing}>
          <Box alignItems="flex-start">
            <ScreenHeader
              title={t('methodsQuestionnaires.cigarette.title')!}
              alignSelf={'flex-start'}
            />
            <RegularText color={theme.colors.subText.primary}>
              {t('methodsQuestionnaires.cigarette.subTitle')!}
            </RegularText>
          </Box>
          <Formik
            initialValues={{
              unitsPerDay: edit
                ? (patient?.patientConsumptionMethods?.cigaretteDetails
                    ?.unitsPerDay as number)
                : 0,
              daysPerWeek: edit
                ? (patient?.patientConsumptionMethods?.cigaretteDetails
                    ?.daysPerWeek as number)
                : 0,
              unitsPerBox: edit
                ? patient?.patientConsumptionMethods?.cigaretteDetails
                    ?.unitsPerBox
                : 10,
              boxPrice: edit
                ? (patient?.patientConsumptionMethods?.cigaretteDetails
                    ?.boxPrice as number)
                : 0,
            }}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              const service = edit
                ? async (data: any) => await cigarreteService.update(data)
                : async (data: any) => await cigarreteService.create(data)

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
              <VStack space={spacing}>
                <InputField
                  keyboardType="numeric"
                  label={
                    t('methodsQuestionnaires.cigarette.labels.unitsPerDay')!
                  }
                  labelStyle={{
                    _text: {
                      fontSize: 'md',
                      color: theme.colors.primary.default,
                      bold: true,
                      pb: 2,
                    },
                  }}
                  name="unitsPerDay"
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
                  label={
                    t('methodsQuestionnaires.cigarette.labels.daysPerWeek')!
                  }
                  name="daysPerWeek"
                  placeholder="Número"
                  color={theme.colors.subText.primary}
                  placeholderTextColor={theme.colors.subText.primary}
                />

                <RadioInput
                  label={
                    t('methodsQuestionnaires.cigarette.labels.unitsPerBox')!
                  }
                  labelStyle={{
                    _text: {
                      fontSize: 'md',
                      color: theme.colors.primary.default,
                      bold: true,
                      pb: 2,
                    },
                  }}
                  name="unitsPerBox"
                  optionStyle={{
                    value: '',
                    _text: { color: theme.colors.subText.primary },
                  }}
                  options={[
                    { key: 'Pequeña (10 unidades)', value: 10 },
                    { key: 'Grande (20 unidades)', value: 20 },
                  ]}
                  direction="column"
                />

                <InputField
                  keyboardType="numeric"
                  label={t('methodsQuestionnaires.cigarette.labels.price')!}
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
                <HStack justifyContent="space-evenly" w="full">
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
              </VStack>
            )}
          </Formik>
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

const validationSchema = object({
  unitsPerDay: number().required(),
  unitsPerBox: number().required(),
  daysPerWeek: number().required(),
  boxPrice: number().required(),
})

export default CigaretteQuestionnaire
