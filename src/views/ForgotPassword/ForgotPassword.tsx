import React, { FC, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, SafeAreaView } from 'react-native'
import {
  LongInputField,
  ScreenHeader,
  SendButton,
  RegularText,
  WhiteX,
  HideKeyboardOnForms,
  ScreenContainer,
  InputField,
  SubmitMessage,
} from '../../components'
import StyleSheet from '../../styles/DarkBlueView'
import { ForgotPasswordStyle } from '../../styles/ForgotPassword'
import { Box, Text, VStack } from 'native-base'
import theme from '../../AppTheme'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { resetPassword } from '../../services/loginService'
import { RootScreenProps } from '../../routes/MainNavigator'

const ForgotPassword: FC<RootScreenProps<'ForgotPassword'>> = ({
  navigation,
}) => {
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  return (
    <HideKeyboardOnForms>
      <ScreenContainer bg={theme.colors.primary.default}>
        <VStack
          alignItems={'center'}
          justifyContent={'center'}
          bg="transparent"
          space={12}
          flex={1}
        >
          {success == true ? (
            <>
              <SubmitMessage type="success" fontSize={'xl'} color="#fff">
                Se le ha enviado un mensaje a su correo electrónico
              </SubmitMessage>
              <SendButton
                text="Atrás"
                bg={theme.colors.primary.light}
                mb={5}
                onPress={() => navigation.goBack()}
              />
            </>
          ) : (
            <>
              <Box bg="transparent">
                <Text textAlign={'center'} color="#fff" fontSize={'3xl'}>
                  ¿Olvidaste tu contraseña?
                </Text>
                <Text color={'#d8dee6'} fontSize="lg">
                  Ingresa la dirección de correo electrónico asociada con tu
                  cuenta para recuperarla.
                </Text>
              </Box>
              <Formik
                validationSchema={validationSchema}
                initialValues={{ email: '' }}
                onSubmit={async ({ email }) => {
                  try {
                    await resetPassword(email)
                    setSuccess(true)
                  } catch (error) {
                    console.log(
                      '🚀 ~ file: ForgotPassword.tsx ~ line 69 ~ onSubmit={ ~ error',
                      error.response.data
                    )
                    setSuccess(false)
                  }
                }}
              >
                {({ handleSubmit }) => (
                  <>
                    <VStack bg="transparent">
                      <InputField
                        name="email"
                        label="Correo electrónico"
                        labelStyle={{ _text: { color: '#fff' } }}
                        mb={5}
                        height={60}
                      />
                      {success == false && (
                        <SubmitMessage type={'error'}>
                          El correo no ha sido encontrado
                        </SubmitMessage>
                      )}
                      <SendButton
                        text="Enviar"
                        bg={theme.colors.primary.light}
                        mb={5}
                        onPress={() => handleSubmit()}
                      />
                    </VStack>
                  </>
                )}
              </Formik>
            </>
          )}
        </VStack>
      </ScreenContainer>
    </HideKeyboardOnForms>
  )
}

const validationSchema = object({
  email: string().email().required(),
})

export default ForgotPassword
