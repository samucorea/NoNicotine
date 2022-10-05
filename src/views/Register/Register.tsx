import React from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Container, Box, VStack } from 'native-base'
import { ScreenHeader } from '../../components/ScreenHeader'
import { RegularText } from '../../components/RegularText'
import { InputField } from '../../components/inputs/PlaceholderInputField'
import { BirthDateInput } from '../../components/inputs/BirthDateInput'
import { SexSelection } from '../../components/SexSelection'
import { SendButton } from '../../components/SendButton'
import { PasswordInputField } from '../../components/inputs/PasswordInputField'

const Register: React.FC<RootScreenProps<'Register'>> = ({
  navigation,
  route: {
    params: { role },
  },
}) => {
  const subHeaderText =
    role === 'therapist'
      ? 'Completa este formulario con tu información'
      : 'Estás muy cerca de mejorar tu vida...'

  return (
    <Box flex={1} alignItems="center" flexDirection="column">
      <Container>
        <VStack space={5}>
          <Box alignSelf="center" display="flex">
            <ScreenHeader title="¡Bienvenido/a!" />
            <RegularText>{subHeaderText}</RegularText>
          </Box>

          <InputField placeholder="Nombre completo" />
          <InputField placeholder="Correo electrónico" />
          <BirthDateInput />
          <SexSelection />
          <PasswordInputField placeholder="Contraseña" />
          <PasswordInputField placeholder="Confirmar contraseña" />
          <SendButton
            buttonContent="Crear cuenta"
            onPress={() => {
              navigation.navigate('MethodSelection')
            }}
          />
        </VStack>
      </Container>
    </Box>
  )
}

export default Register
