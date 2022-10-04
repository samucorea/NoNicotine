import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackScreens } from '../routes/MainNavigator'
import { Container, Box, useColorModeValue, Pressable } from 'native-base'
import theme from '../AppTheme'
import { Dimensions } from 'react-native'
import {
  PlaceholderInputField,
  SectionHeader,
  RegularText,
  BirthDateInput,
  SexSelection,
  SendButton,
  PasswordInputField,
} from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = NativeStackScreenProps<RootStackScreens, 'RegisterTherapist'>

const RegisterTherapist: React.FC<Props> = () => {
  return (
    <Box
      display="flex"
      alignSelf="center"
      alignItems="center"
      flexDirection="column"
      width={Dimensions.get('window').width}
      height={Dimensions.get('window').height}
    >
      <Pressable alignSelf="flex-start" marginTop="22px" marginLeft="22px">
        <Ionicons
          name="arrow-back"
          size={32}
          color={useColorModeValue(
            theme.colors.primary.default,
            theme.colors.primary.light
          )}
        ></Ionicons>
      </Pressable>
      <Container>
        <Box alignSelf="center" display="flex" marginY="32px">
          <SectionHeader
            sectionHeaderContent="¡Bienvenido/a!"
            sectionHeaderFontSize={28}
          />
          <RegularText RegularTextContent="Estás muy cerca de mejorar tu vida..." />
        </Box>
        <PlaceholderInputField PlaceholderContent="Nombre completo" />
        <PlaceholderInputField PlaceholderContent="Correo electrónico" />
        <BirthDateInput />
        <SexSelection />
        <PasswordInputField PlaceholderContent="Contraseña" />
        <PlaceholderInputField PlaceholderContent="Cédula de identidad" />
        <SendButton buttonContent="Crear cuenta" />
      </Container>
    </Box>
  )
}

export default RegisterTherapist