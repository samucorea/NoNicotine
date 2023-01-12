import { Formik } from 'formik'
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { object, string } from 'yup'
import theme from '../../AppTheme'
import {
  HideKeyboardOnForms,
  InputField,
  ScreenContainer,
  SendButton,
} from '../../components'
import { useLoadingContext } from '../../contexts/LoadingContext'
import { useUserContext } from '../../contexts/UserContext'
import { RootScreenProps } from '../../routes/MainNavigator'
import BaseCrudService from '../../services/baseCrudService'

const DarkLogo = require('../../../assets/dark-logo.png')

const Login: FC<RootScreenProps<'Login'>> = ({ navigation }) => {
  const userContext = useUserContext()
  const loadingContext = useLoadingContext()
  const { t } = useTranslation()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const removeErrorMessage = () => {
    if (errorMessage !== undefined) {
      setErrorMessage(undefined)
    }
  }

  return (
    <HideKeyboardOnForms>
      <ScreenContainer bg={theme.colors.primary.default}>
        <VStack alignItems={'center'} bg="transparent" flex={1}>
          <Box bg="transparent" flex={1}>
            <Image source={DarkLogo} alt="app_logo" />
          </Box>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values) => {
              loadingContext?.setLoading(true, t('login.signingIn')!)
              try {
                await userContext?.logIn(values)

                BaseCrudService.UpdateConfig()
              } catch (error: any) {
                console.log(
                  '🚀 ~ file: Login.tsx ~ line 59 ~ onSubmit={ ~ error',
                  error
                )

                const errorMessage: string = error.response.data.message

                switch (errorMessage) {
                  case 'Wrong email and/or password':
                    setErrorMessage(errors[errorMessage])
                    break

                  case 'User email is not yet confirmed':
                    setErrorMessage(errors[errorMessage])
                    break
                  default:
                    console.error(errorMessage)
                    break
                }
              }
              loadingContext?.setLoading(false)
            }}
          >
            {({ handleSubmit }) => (
              <>
                <VStack bg="transparent" flex={2} pt={20}>
                  <InputField
                    onFocus={removeErrorMessage}
                    name="email"
                    label={t('login.email')!}
                    labelStyle={{ _text: { color: '#fff' } }}
                    mb={5}
                    height={60}
                  />
                  <InputField
                    onFocus={removeErrorMessage}
                    name={'password'}
                    password
                    label={t('login.password')!}
                    labelStyle={{ _text: { color: '#fff' } }}
                    height={60}
                    mb={2.5}
                  />
                  {errorMessage !== undefined && (
                    <Text color="error.600" fontSize={'md'} mb={2}>
                      {errorMessage}
                    </Text>
                  )}

                  <Pressable
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Text underline color={'#d8dee6'} textAlign="center">
                      {t('login.forgot-password')!}
                    </Text>
                  </Pressable>
                </VStack>
                <Box bg="transparent" flex={1}>
                  <SendButton
                    text={t('login.init-session')!}
                    bg={theme.colors.primary.light}
                    mb={5}
                    onPress={() => handleSubmit()}
                  />
                  <Pressable onPress={() => navigation.navigate('SelectRole')}>
                    <HStack bg="transparent">
                      <Text color={'#fff'}>
                        {t('login.register.message')!}{' '}
                      </Text>
                      <Text color={'#d8dee6'} underline>
                        {t('login.register.button')!}
                      </Text>
                    </HStack>
                  </Pressable>
                </Box>
              </>
            )}
          </Formik>
        </VStack>
      </ScreenContainer>
    </HideKeyboardOnForms>
  )
}

const validationSchema = object({
  password: string().required(),
  email: string().email().required(),
})

const errors = {
  'Wrong email and/or password': 'Usuario o contraseña inválido',
  'User email is not yet confirmed': 'Su correo aún no ha sido confirmado',
}

export default Login
