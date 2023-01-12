import { Formik } from 'formik'
import { Box, HStack, IconButton, Image, VStack } from 'native-base'
import React, { useState } from 'react'
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
import moment from 'moment'
import patientService from '../../services/patientService'
import { Sex } from '../../sharedTypes'
import { Roles } from '../../utils/enums/Roles'

const EditIcon = require('../../../assets/pencil.png')

const Profile: React.FC<RootScreenProps<'Profile'>> = ({
  route,
  navigation,
}) => {
  const { user, logOut, setStoredUser } = useUserContext()
  const [editing, setEditing] = useState(false)

  const toggleEdit = () => {
    setEditing(!editing)
  }

  const handleRelapse = async () => {
    try {
      const response = await patientService.relapse(user?.id as string)
      console.log(
        '🚀 ~ file: Profile.tsx:36 ~ handleRelapse ~ response',
        response.data
      )
      setStoredUser({ ...response.data, role: Roles.patient })
      navigation.goBack()
    } catch (error) {
      console.log('🚀 ~ file: Profile.tsx:36 ~ handleRelapse ~ error', error)
    }
  }

  return (
    <ScreenContainer>
      <VStack space={5} flexGrow={1} position="relative" w="full">
        <Formik
          initialValues={{
            email: user?.email as string,
            birthDate: moment(user?.birthDate).toDate(),
            sex: user?.sex as Sex,
            name: user?.name as string,
          }}
          onSubmit={async (values) => {
            try {
              const response = await patientService.updatePatient({
                ...values,
                id: user?.id as string,
              })

              setStoredUser(response.data)

              toggleEdit()
            } catch (error) {
              console.log('🚀 ~ file: Profile.tsx:72 ~ error', error)
            }
          }}
        >
          {({ handleSubmit }) => (
            <>
              <VStack alignItems={'center'} w="100%" mb={5}>
                <ProfileIcon width={100} height={100} />
                <HStack position="relative">
                  <InputField
                    name="name"
                    isDisabled={!editing}
                    color="primary.default"
                    _disabled={{ color: 'primary.default', opacity: 1 }}
                    borderWidth={0}
                    fontSize={28}
                    textAlign={'center'}
                    alignSelf="center"
                    rightElement={
                      <Box justifyContent="center" alignItems={'center'}>
                        <IconButton
                          icon={
                            <Image
                              source={EditIcon}
                              alt="pencil"
                              tintColor={theme.colors.primary.default}
                              size="5"
                            />
                          }
                          onPress={toggleEdit}
                          size="5"
                        />
                      </Box>
                    }
                  />
                </HStack>
              </VStack>
              <InputField
                name="email"
                isDisabled={!editing}
                placeholder="Correo electrónico"
              />
              <BirthDateInput name="birthDate" isDisabled={!editing} />
              <RadioInput
                name="sex"
                options={['M', 'F']}
                isDisabled={!editing}
              />
              {editing ? (
                <SendButton
                  text="Guardar"
                  bottom={5}
                  position={'absolute'}
                  onPress={() => handleSubmit()}
                />
              ) : (
                <SendButton
                  text="Cerrar sesión"
                  bottom={5}
                  position={'absolute'}
                  onPress={logOut}
                />
              )}
            </>
          )}
        </Formik>
      </VStack>
      {user?.role == Roles.patient && (
        <SendButton
          text="Tuve una recaída"
          bg="#ef756d"
          mb={10}
          onPress={handleRelapse}
        />
      )}
    </ScreenContainer>
  )
}

export default Profile
