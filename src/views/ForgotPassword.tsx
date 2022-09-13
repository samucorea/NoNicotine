import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, SafeAreaView } from 'react-native'
import { LongInputField } from '../components/LongInputField'
import { SectionHeader } from '../components/SectionHeader1'
import { SendButton } from '../components/SendButton'
import StyleSheet from '../styles/DarkBlueView'
import { RegularText } from '../components/RegularText1'
import { ForgotPasswordStyle } from '../styles/ForgotPassword'
import { WhiteX } from '../components/WhiteX'

const ForgotPassword = (): JSX.Element => {
  return (
    <SafeAreaView style={StyleSheet.container}>
      <WhiteX />
      <View style={ForgotPasswordStyle.mainContainer}>
        <StatusBar translucent={false} backgroundColor="#FFFFFF" />
        <SectionHeader sectionHeaderContent="¿Olvidaste tu contraseña?" />
        <View style={ForgotPasswordStyle.regularTextContainer}>
          <RegularText RegularTextContent="Ingresa la dirección de correo electrónico asociada con tu cuenta para recuperarla." />
        </View>
        <View style={ForgotPasswordStyle.inputContainer}>
          <LongInputField LongInputFieldTitle="Correo electrónico" />
          <SendButton buttonContent="Enviar" />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword
