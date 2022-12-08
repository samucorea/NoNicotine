import { Center, Fab, Heading, Image } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { SendButton, VStackContainer } from '../../components'
import {
  TherapistContextProps,
  useUserContext,
} from '../../contexts/UserContext'
import { useFocus, useModalToggle } from '../../hooks'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import { linkService } from '../../services/linkService'
import therapistService from '../../services/therapistService'
import LinkModal from './Components/LinkModal'
import PatientListing from './Components/PatientListing'
const LinkIcon = require('../../../assets/link.png')

const TherapistDashboard: FC<MenuScreenProps<'TherapistDashboard'>> = ({
  navigation,
}) => {
  const { user, setStoredUser } = useUserContext<TherapistContextProps>() ?? {}
  const { show, toggleShow } = useModalToggle()
  const isFocused = useFocus(navigation)

  useEffect(() => {
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

    if (isFocused) {
      getPatients()
    }
  }, [isFocused])

  if (user?.patients.length == 0) {
    return (
      <Center flex={1}>
        <Heading mb={2} textAlign={'center'} color="primary.default">
          Aún no tiene pacientes
        </Heading>
        <SendButton text="Vincular paciente" onPress={toggleShow} />
      </Center>
    )
  }

  return (
    <VStackContainer>
      {user?.patients.map((patient, index) => (
        <PatientListing key={index} name={patient.name} lastMessage="Hola" />
      ))}
      <LinkModal show={show} toggleShow={toggleShow} />
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
          onPress={toggleShow}
        />
      )}
    </VStackContainer>
  )
}

export default TherapistDashboard
