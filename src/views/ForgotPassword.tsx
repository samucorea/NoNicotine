import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, SafeAreaView } from 'react-native'
import { LongInputField } from '../components/inputs/LongInputField'
import { ScreenHeader } from '../components/ScreenHeader'
import { SendButton } from '../components/SendButton'
import StyleSheet from '../styles/DarkBlueView'
import { RegularText } from '../components/RegularText'
import { ForgotPasswordStyle } from '../styles/ForgotPassword'
import { WhiteX } from '../components/WhiteX'

const ForgotPassword = (): JSX.Element => {
  return (
    <SafeAreaView style={StyleSheet.container}>
      <WhiteX />
      <View style={ForgotPasswordStyle.mainContainer}>
        <StatusBar translucent={false} backgroundColor="#FFFFFF" />
        <ScreenHeader title="¿Olvidaste tu contraseña?" />
        <View style={ForgotPasswordStyle.regularTextContainer}>
          <RegularText>
            Ingresa la dirección de correo electrónico asociada con tu cuenta
            para recuperarla.
          </RegularText>
        </View>
        <View style={ForgotPasswordStyle.inputContainer}>
          <LongInputField LongInputFieldTitle="Correo electrónico" />
          <SendButton text="Enviar" />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword
