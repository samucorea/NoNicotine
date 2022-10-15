import { Box, HStack, IconButton, Image, Text, VStack } from 'native-base'
import React from 'react'
import theme from '../../AppTheme'
import {
  BirthDateInput,
  InputField,
  ScreenContainer,
  SendButton,
  SexSelection,
} from '../../components'

const ProfileIcon = require('../../../assets/profile-big.png')
const EditIcon = require('../../../assets/pencil.png')

const Profile = () => {
  return (
    <ScreenContainer>
      <VStack alignItems={'center'} w="100%" mb={5}>
        <Image source={ProfileIcon} size="lg" alt="profile_icon" />
        <HStack position="relative">
          <Text bold fontSize={28} color={theme.colors.primary.default}>
            Mario Almanzar
          </Text>
          <Box
            position={'absolute'}
            right={-25}
            bottom={0}
            top={0}
            justifyContent="center"
            alignItems={'center'}
          >
            <IconButton
              icon={
                <Image
                  source={EditIcon}
                  alt="pencil"
                  tintColor={theme.colors.primary.default}
                  size="5"
                />
              }
              size="5"
            />
          </Box>
        </HStack>
      </VStack>
      <VStack space={5} flexGrow={1} position="relative">
        <InputField isDisabled placeholder="Correo electrónico" />
        <BirthDateInput />
        <SexSelection />
        <SendButton text="Guardar" bottom={5} position={'absolute'} />
      </VStack>
      <SendButton text="Tuve una recaída" bg="#ef756d" mb={10} />
    </ScreenContainer>
  )
}

export default Profile
