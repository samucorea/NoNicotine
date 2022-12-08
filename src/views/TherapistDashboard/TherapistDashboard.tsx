import { Button, Center, Fab, Heading, Image, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { SendButton, VStackContainer } from '../../components'
import {
  TherapistContextProps,
  useUserContext,
} from '../../contexts/UserContext'
import { Patient } from '../../models'
import { linkService } from '../../services/linkService'
import therapistService from '../../services/therapistService'
import PatientListing from './Components/PatientListing'
const LinkIcon = require('../../../assets/link.png')

const TherapistDashboard = () => {
  const { user } = useUserContext<TherapistContextProps>() ?? {}
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await therapistService.getPatients()
        setPatients(response.data)
        setLoading(false)
      } catch (error) {
        console.log(
          '🚀 ~ file: TherapistDashboard.tsx:21 ~ getPatients ~ error',
          error
        )
      }
    }

    getPatients()
  }, [])

  const openPopUp = async () => {
    try {
      const response = await linkService.makeLinkRequest(
        user!.identityUserId!,
        'jlbello24@gmail.com'
      )
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

  if (loading) {
    return (
      <Center flex={1}>
        <Heading textAlign={'center'} color="primary.default">
          Cargando pacientes...
        </Heading>
      </Center>
    )
  }

  if (patients.length == 0) {
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
      {patients.map((patient, index) => (
        <PatientListing key={index} name={patient.name} lastMessage="Hola" />
      ))}
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
    </VStackContainer>
  )
}

export default TherapistDashboard
