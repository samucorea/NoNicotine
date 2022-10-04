import React from 'react'
import { RootScreenProps } from '../routes/MainNavigator'
import { Container, Box, useColorModeValue, Pressable } from 'native-base'
import { SectionHeader } from '../components/SectionHeader'
import theme from '../AppTheme'
import { Dimensions } from 'react-native'
import { RegularText } from '../components/RegularText'
import { PlaceholderInputField } from '../components/inputs/PlaceholderInputField'
import { BirthDateInput } from '../components/inputs/BirthDateInput'
import { SexSelection } from '../components/SexSelection'
import { SendButton } from '../components/SendButton'
import { PasswordInputField } from '../components/inputs/PasswordInputField'
import Ionicons from '@expo/vector-icons/Ionicons'

const RegisterPatient: React.FC<RootScreenProps<'RegisterPatient'>> = () => {
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
          <SectionHeader sectionHeaderContent="¡Bienvenido/a!" />
          <RegularText RegularTextContent="Estás muy cerca de mejorar tu vida..." />
        </Box>
        <PlaceholderInputField PlaceholderContent="Nombre completo" />
        <PlaceholderInputField PlaceholderContent="Correo electrónico" />
        <BirthDateInput />
        <SexSelection />
        <PasswordInputField PlaceholderContent="Contraseña" />
        <SendButton buttonContent="Crear cuenta" />
      </Container>
    </Box>
  )
}

export default RegisterPatient
