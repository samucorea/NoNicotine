import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, SafeAreaView } from 'react-native'
import {
  LongInputField,
  ScreenHeader,
  SendButton,
  RegularText,
  WhiteX,
} from '../components'
import StyleSheet from '../styles/DarkBlueView'
import { ForgotPasswordStyle } from '../styles/ForgotPassword'
import { Box } from 'native-base'

const ForgotPassword = (): JSX.Element => {
  return (
    <SafeAreaView style={StyleSheet.container}>
      <WhiteX />
      <Box py={'15%'} px={'10%'}>
        <StatusBar translucent={false} backgroundColor="#FFFFFF" />
        <ScreenHeader title="¿Olvidaste tu contraseña?" />
        <Box style={ForgotPasswordStyle.regularTextContainer}>
          <RegularText>
            Ingresa la dirección de correo electrónico asociada con tu cuenta
            para recuperarla.
          </RegularText>
        </Box>
        <Box style={ForgotPasswordStyle.inputContainer}>
          <LongInputField LongInputFieldTitle="Correo electrónico" />
          <SendButton text="Enviar" />
        </Box>
      </Box>
    </SafeAreaView>
  )
}

export default ForgotPassword
