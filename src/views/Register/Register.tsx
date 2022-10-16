import React, { useState } from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, ScrollView, Spinner, VStack } from 'native-base'
import {
  ScreenHeader,
  RegularText,
  InputField,
  BirthDateInput,
  SexSelection,
  SendButton,
  ScreenContainer,
  SelectInputField,
} from '../../components'
import User, { RegisterUser } from '../../models/User'
import patientService from '../../services/patientService'
import { Formik } from 'formik'
import { object, string, date, ref } from 'yup'
import moment from 'moment'
import { Patient } from '../../models'
import { RegisterPatient } from '../../models/Patient'
import { Identification, Sex } from '../../sharedTypes'
import { AxiosError } from 'axios'
import { useLoadingContext } from '../../contexts/LoadingContext'

const Register: React.FC<RootScreenProps<'Register'>> = ({
  navigation,
  route: {
    params: { role },
  },
}) => {
  const loadingContext = useLoadingContext()

  const subHeaderText =
    role === 'therapist'
      ? 'Completa este formulario con tu información'
      : 'Estás muy cerca de mejorar tu vida...'

  const formSpacing = 5

  return (
    <ScreenContainer>
      <ScrollView w="100%" showsVerticalScrollIndicator={false}>
        <VStack space={formSpacing}>
          <Box alignSelf="center" display="flex">
            <ScreenHeader title="¡Bienvenido/a!" />
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
              identificationPatientType: '' as Identification,
            }}
            onSubmit={async (values, formikHelpers) => {
              loadingContext?.setLoading(true, 'Creando usuario')

              if (role == 'patient') {
                const { confirmPassword, ...registerValues } = values

                try {
                  await patientService.create(registerValues as RegisterPatient)
                } catch (error: any) {
                  switch (error.response.data.message) {
                    case 'Email already taken':
                      formikHelpers.setFieldError(
                        'email',
                        'Este correo ya está registrado'
                      )
                      break

                    default:
                      break
                  }
                }
              }

              loadingContext?.setLoading(false)
            }}
          >
            {({ handleSubmit, values }) => (
              <VStack space={formSpacing} flex={1} w="100%">
                <InputField
                  name={'name'}
                  placeholder="Nombre completo"
                  // value={user.first_name}
                />
                <InputField name={'email'} placeholder="Correo electrónico" />
                <BirthDateInput name={'birthDate'} />
                <SexSelection name={'sex'} />
                <InputField
                  name={'password'}
                  password
                  placeholder="Contraseña"
                />
                <InputField
                  name={'confirmPassword'}
                  password
                  placeholder="Confirmar contraseña"
                />
                <SelectInputField
                  name={'identificationPatientType'}
                  options={['Cédula', 'Pasaporte']}
                  placeholder="Tipo de documento"
                />
                {values.identificationPatientType && (
                  <InputField
                    name={'identification'}
                    placeholder={`Número de ${values.identificationPatientType}`}
                  />
                )}

                <SendButton
                  mb={10}
                  text="Crear cuenta"
                  onPress={() => handleSubmit()}
                />
              </VStack>
            )}
          </Formik>
        </VStack>
      </ScrollView>
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
  identificationPatientType: string().required().oneOf(['Cédula', 'Pasaporte']),
  identification: string().required(),
})

export default Register
