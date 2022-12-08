import { Button, Center, Fab, Heading, Image, Text } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { SendButton, VStackContainer } from '../../components'
import {
  TherapistContextProps,
  useUserContext,
} from '../../contexts/UserContext'
import { useFocus } from '../../hooks'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import { linkService } from '../../services/linkService'
import therapistService from '../../services/therapistService'
import PatientListing from './Components/PatientListing'
const LinkIcon = require('../../../assets/link.png')

const TherapistDashboard: FC<MenuScreenProps<'TherapistDashboard'>> = ({
  navigation,
}) => {
  const { user, setStoredUser } = useUserContext<TherapistContextProps>() ?? {}
  const isFocused = useFocus(navigation)

  const getPatients = async () => {
    try {
      const response = await therapistService.getPatients()

      user!.patients = response.data

      setStoredUser!(user!)
    } catch (error) {
      console.log(
        '🚀 ~ file: TherapistDashboard.tsx:21 ~ getPatients ~ error',
        error
      )
    }
  }

  const openPopUp = async () => {
    try {
      const response = await linkService.makeLinkRequest(
        user!.identityUserId!,
        'jlbello24@gmail.com'
      )

      getPatients()

      console.log(
        '🚀 ~ file: TherapistDashboard.tsx:21 ~ openPopUp ~ response',
        response.data
      )
    } catch (error) {
      console.log(
        '🚀 ~ file: TherapistDashboard.tsx:18 ~ openPopUp ~ error',
        error
      )
    }
  }

  if (user?.patients.length == 0) {
    return (
      <Center flex={1}>
        <Heading mb={2} textAlign={'center'} color="primary.default">
          Aún no tiene pacientes
        </Heading>
        <SendButton text="Vincular paciente" onPress={openPopUp} />
      </Center>
    )
  }

  return (
    <VStackContainer>
      {user?.patients.map((patient, index) => (
        <PatientListing key={index} name={patient.name} lastMessage="Hola" />
      ))}
      {isFocused && (
        <Fab
          icon={
            <Image
              source={LinkIcon}
              alt="image"
              bg={'primary.default'}
              size={35}
            />
          }
          bottom={90}
          bg="primary.default"
          onPress={openPopUp}
        />
      )}
    </VStackContainer>
  )
}

export default TherapistDashboard
