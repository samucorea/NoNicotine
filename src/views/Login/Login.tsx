import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import theme from '../../AppTheme'
import {
  HideKeyboardOnForms,
  InputField,
  PasswordInputField,
  ScreenContainer,
  SendButton,
} from '../../components'
import { RootScreenProps } from '../../routes/MainNavigator'

const DarkLogo = require('../../../assets/dark-logo.png')

const Login: FC<RootScreenProps<'Login'>> = ({ navigation }) => {
  const handleSubmit = async () => {
    navigation.navigate('Menu')
  }
  return (
    <HideKeyboardOnForms>
      <ScreenContainer bg={theme.colors.primary.default}>
        <VStack alignItems={'center'} bg="transparent" flex={1}>
          <Box bg="transparent" flex={1}>
            <Image source={DarkLogo} alt="app_logo" />
          </Box>
          <VStack bg="transparent" flex={2} pt={20}>
            <InputField
              label="Correo electrónico"
              labelStyle={{ color: '#fff' }}
              mb={5}
              height={60}
            />
            <PasswordInputField
              label="Contraseña"
              labelStyle={{ color: '#fff' }}
              height={60}
              mb={2.5}
            />
            <Pressable>
              <Text underline color={'#d8dee6'} textAlign="center">
                ¿Olvidaste tu contraseña?
              </Text>
            </Pressable>
          </VStack>
          <Box bg="transparent" flex={1}>
            <SendButton
              text="Iniciar sesión"
              bg={theme.colors.primary.light}
              mb={5}
              onPress={handleSubmit}
            />
            <Pressable onPress={() => navigation.navigate('SelectRole')}>
              <HStack bg="transparent">
                <Text color={'#fff'}>¿Eres nuevo aquí? </Text>
                <Text color={'#d8dee6'} underline>
                  Regístrate
                </Text>
              </HStack>
            </Pressable>
          </Box>
        </VStack>
      </ScreenContainer>
    </HideKeyboardOnForms>
  )
}

export default Login
