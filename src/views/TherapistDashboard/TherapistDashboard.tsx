import { Center, Fab, Heading, Image } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { SendButton, VStackContainer } from '../../components'
import {
  TherapistContextProps,
  useUserContext,
} from '../../contexts/UserContext'
import { useFocus, useModalToggle } from '../../hooks'
import { Conversations } from '../../models'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import { chatService } from '../../services/chatService'
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
  const [conversations, setConversations] = useState<Conversations>({})
  const [loading, setLoading] = useState(true)
  const isFocused = useFocus(navigation)

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await therapistService.getPatients()

        user!.patients = response.data

        setStoredUser(user!)
      } catch (error) {
        console.log(
          '🚀 ~ file: TherapistDashboard.tsx:21 ~ getPatients ~ error',
          error
        )
      }
    }

    const retreiveConversations = async () => {
      try {
        const conversationsTMP = await chatService.getConversations()

        setConversations(conversationsTMP)
      } catch (error) {
        console.log(
          '🚀 ~ file: TherapistDashboard.tsx:46 ~ retreiveConversations ~ error',
          error
        )
      }

      setLoading(false)
    }

    if (isFocused) {
      retreiveConversations()
      getPatients()
    }
  }, [isFocused])

  if (user?.patients?.length == 0) {
    return (
      <Center flex={1}>
        <Heading mb={2} textAlign={'center'} color="primary.default">
          Aún no tiene pacientes
        </Heading>
        <SendButton text="Vincular paciente" onPress={() => toggleShow()} />
      </Center>
    )
  }

  return (
    <VStackContainer>
      {user?.patients?.map((patient, index) => (
        <PatientListing
          key={index}
          name={patient.name}
          conversation={conversations[patient.id]}
        />
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
          onPress={() => toggleShow()}
        />
      )}
    </VStackContainer>
  )
}

export default TherapistDashboard
