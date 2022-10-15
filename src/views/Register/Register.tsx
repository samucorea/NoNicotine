import React, { useState } from 'react'
import { RootScreenProps } from '../../routes/MainNavigator'
import { Box, VStack } from 'native-base'
import {
  ScreenHeader,
  RegularText,
  InputField,
  BirthDateInput,
  SexSelection,
  SendButton,
  PasswordInputField,
  ScreenContainer,
} from '../../components'
import { RegisterUser } from '../../models/User'
import patientService from '../../services/patientService'

const Register: React.FC<RootScreenProps<'Register'>> = ({
  navigation,
  route: {
    params: { role },
  },
}) => {
  const [user, setUser] = useState<RegisterUser>({
    first_name: '',
    id: 0,
    last_name: '',
    password: '',
  })

  const subHeaderText =
    role === 'therapist'
      ? 'Completa este formulario con tu información'
      : 'Estás muy cerca de mejorar tu vida...'

  const handleSubmit = () => {
    if (role === 'patient') {
      patientService.create(user)
    }

    navigation.navigate('MethodSelection')
  }

  return (
    <ScreenContainer>
      <VStack space={5}>
        <Box alignSelf="center" display="flex">
          <ScreenHeader title="¡Bienvenido/a!" />
          <RegularText>{subHeaderText}</RegularText>
        </Box>

        <InputField placeholder="Nombre completo" value={user.first_name} />
        <InputField placeholder="Correo electrónico" />
        <BirthDateInput />
        <SexSelection />
        <PasswordInputField placeholder="Contraseña" />
        <PasswordInputField placeholder="Confirmar contraseña" />
        <SendButton text="Crear cuenta" onPress={handleSubmit} />
      </VStack>
    </ScreenContainer>
  )
}

export default Register
