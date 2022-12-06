import { Formik } from 'formik'
import { Box, HStack, IconButton, Image, Text, VStack } from 'native-base'
import React from 'react'
import theme from '../../AppTheme'
import {
  BirthDateInput,
  InputField,
  ScreenContainer,
  SendButton,
  RadioInput,
} from '../../components'
import { useUserContext } from '../../contexts/UserContext'
import { RootScreenProps } from '../../routes/MainNavigator'
import ProfileIcon from '../../../assets/profile.svg'

const EditIcon = require('../../../assets/pencil.png')

const Profile: React.FC<RootScreenProps<'Profile'>> = ({
  route,
  navigation,
}) => {
  const userContext = useUserContext()

  return (
    <ScreenContainer>
      <VStack alignItems={'center'} w="100%" mb={5}>
        <ProfileIcon width={100} height={100} />
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
        <Formik
          initialValues={{
            email: 'jlbello24@gmail.com',
            birthDate: userContext?.user?.birthDate,
            sex: userContext?.user?.sex,
          }}
          onSubmit={() => {}}
        >
          {({ handleSubmit }) => (
            <>
              <InputField
                name="email"
                isDisabled
                placeholder="Correo electrónico"
              />
              <BirthDateInput name="birthDate" />
              <RadioInput name="sex" options={['M', 'F']} />
              <SendButton
                text="Guardar"
                bottom={5}
                position={'absolute'}
                onPress={() => handleSubmit()}
              />
              <SendButton
                text="Cerrar sesión"
                bottom={5}
                position={'absolute'}
                onPress={userContext?.logOut}
              />
            </>
          )}
        </Formik>
      </VStack>
      <SendButton text="Tuve una recaída" bg="#ef756d" mb={10} />
    </ScreenContainer>
  )
}

export default Profile
