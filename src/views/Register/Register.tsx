import React, { useState } from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, ScrollView, VStack } from 'native-base'
import {
  ScreenHeader,
  RegularText,
  InputField,
  BirthDateInput,
  RadioInput,
  SendButton,
  ScreenContainer,
  SelectInputField,
  SubmitMessage,
} from '../../components'
import patientService from '../../services/patientService'
import { Formik } from 'formik'
import { object, string, date, ref } from 'yup'
import moment from 'moment'
import { Identification, Sex } from '../../sharedTypes'
import { useLoadingContext } from '../../contexts/LoadingContext'
import theme from '../../AppTheme'
import therapistService from '../../services/therapistService'
import { Roles } from '../../utils/enums/Roles'
import { useTranslation } from 'react-i18next'

const Register: React.FC<RootScreenProps<'Register'>> = ({
  navigation,
  route: {
    params: { role },
  },
}) => {
  const loadingContext = useLoadingContext()
  const [created, setCreated] = useState(false)
  const { t } = useTranslation()

  const subHeaderText =
    role === Roles.therapist
      ? t('register.subHeaderText.therapist')
      : t('register.subHeaderText.patient')

  const formSpacing = 5

  return (
    <ScreenContainer>
      {created ? (
        <Box flex={1} w="100%" justifyContent="center" alignItems={'center'}>
          <SubmitMessage type="success" fontSize={'xl'} textAlign="center">
            {t('register.confirmationSent')}
          </SubmitMessage>
          <SendButton
            text={t('register.continue')}
            bg={theme.colors.primary.default}
            mb={5}
            onPress={() => navigation.navigate('Login')}
          />
        </Box>
      ) : (
        <ScrollView w="100%" showsVerticalScrollIndicator={false}>
          <VStack space={formSpacing} justifyContent={'center'}>
            <Box alignSelf="center" display="flex">
              <ScreenHeader title={t('register.title')} />
              <RegularText>{subHeaderText}</RegularText>
            </Box>

            <Formik
              validateOnChange={false}
              validationSchema={validationSchema}
              initialValues={{
                name: '',
                email: '',
                birthDate: new Date(),
                sex: 'M' as Sex,
                password: '',
                confirmPassword: '',
                identification: '',
                identificationType: '' as Identification,
              }}
              onSubmit={async (values, formikHelpers) => {
                loadingContext?.setLoading(true, t('register.creatingUser')!)

                const service =
                  role == Roles.patient
                    ? async (data: any) => await patientService.create(data)
                    : async (data: any) => await therapistService.create(data)

                const { confirmPassword, ...registerValues } = values

                try {
                  await service(registerValues)

                  setCreated(true)
                } catch (error: any) {
                  console.log(
                    '🚀 ~ file: Register.tsx:95 ~ onSubmit={ ~ error',
                    error.response.data
                  )
                  switch (error.response?.data?.message) {
                    case 'Email already taken':
                      formikHelpers.setFieldError(
                        'email',
                        t('register.errors.emailTaken')!
                      )
                      break

                    default:
                      break
                  }
                }
                loadingContext?.setLoading(false)
              }}
            >
              {({ handleSubmit, values }) => (
                <VStack space={formSpacing} flex={1} w="100%">
                  <InputField
                    name={'name'}
                    placeholder={t('register.placeholders.fullName')!}
                  />
                  <InputField
                    name={'email'}
                    placeholder={t('register.placeholders.email')!}
                  />
                  <BirthDateInput name={'birthDate'} />
                  <RadioInput
                    name={'sex'}
                    label={t('register.placeholders.gender')!}
                    options={['M', 'F']}
                  />
                  <InputField
                    name={'password'}
                    password
                    placeholder={t('register.placeholders.password')!}
                  />
                  <InputField
                    name={'confirmPassword'}
                    password
                    placeholder={t('register.placeholders.confirmPassword')!}
                  />
                  <SelectInputField
                    name={'identificationType'}
                    options={[
                      {
                        key: t('register.documentOptions.idCard')!,
                        value: 'Cédula',
                      },
                      {
                        key: t('register.documentOptions.passport')!,
                        value: 'Pasaporte',
                      },
                    ]}
                    placeholder={t('register.placeholders.documentType')!}
                  />
                  {values.identificationType && (
                    <InputField
                      name={'identification'}
                      placeholder={`${t(
                        'register.placeholders.documentNumber'
                      )} ${t(
                        'register.placeholders.' +
                          values.identificationType.toLowerCase()
                      )}`}
                    />
                  )}

                  <SendButton
                    mb={10}
                    text={t('register.createAccount')!}
                    onPress={() => handleSubmit()}
                  />
                </VStack>
              )}
            </Formik>
          </VStack>
        </ScrollView>
      )}
    </ScreenContainer>
  )
}

const validationSchema = object({
  name: string().required(),
  email: string().email().required(),
  birthDate: date()
    .required()
    .max(moment().subtract(18, 'years'), 'Debe ser mayor de 18 años'),
  sex: string().required().oneOf(['M', 'F']),
  password: string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/gm,
      'La contraseña debe tener al menos 1 letra y 1 número'
    )
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: string()
    .required()
    .oneOf([ref('password'), null], 'Las contraseñas deben ser iguales'),
  identificationType: string().required().oneOf(['Cédula', 'Pasaporte']),
  identification: string().required(),
})

export default Register
