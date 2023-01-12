import { Center, Fab, Heading, Image, Spinner, Text, VStack } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { SendButton, VStackContainer } from '../../components'
import {
  TherapistContextProps,
  useUserContext,
} from '../../contexts/UserContext'
import { useFocus, useModalToggle } from '../../hooks'
import { Conversations, Patient, User } from '../../models'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import { chatService } from '../../services/chatService'
import therapistService from '../../services/therapistService'
import LinkModal from './Components/LinkModal'
import PatientListing from './Components/PatientListing'
import theme from '../../AppTheme'
import { useTranslation } from 'react-i18next'
const LinkIcon = require('../../../assets/link.png')

const TherapistDashboard: FC<MenuScreenProps<'TherapistDashboard'>> = ({
  navigation,
}) => {
  const { user, setStoredUser } = useUserContext<TherapistContextProps>() ?? {}
  const { show, toggleShow } = useModalToggle()
  const [conversations, setConversations] = useState<Conversations>({})
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState<Patient[]>([])
  const isFocused = useFocus(navigation)
  const { t } = useTranslation()

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await therapistService.getPatients()

        setPatients(response.data)

        const userTMP = { ...user }

        userTMP.patients = response.data

        await setStoredUser(userTMP as User)
      } catch (error) {
        console.log(
          '🚀 ~ file: TherapistDashboard.tsx:21 ~ getPatients ~ error',
          error
        )
      } finally {
        setLoading(false)
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
    }

    if (isFocused) {
      retreiveConversations()
      getPatients()
    }
  }, [isFocused])

  if (loading) {
    return (
      <VStack
        h="full"
        justifyContent={'center'}
        alignItems={'center'}
        space={2}
      >
        <Spinner size="lg" color={theme.colors.primary.default} />
        <Text fontSize="lg">Cargando pacientes vinculados...</Text>
      </VStack>
    )
  }

  if (patients.length == 0) {
    return (
      <Center flex={1}>
        <Heading mb={2} textAlign={'center'} color="primary.default">
          {t('therapistDashboard.noPatients')!}
        </Heading>
        <SendButton
          text={t('therapistDashboard.vinculatePatients')!}
          onPress={() => toggleShow()}
        />
        <LinkModal show={show} toggleShow={toggleShow} />
      </Center>
    )
  }

  return (
    <VStackContainer>
      {patients.map((patient, index) => (
        <PatientListing
          key={index}
          name={patient.name}
          conversation={conversations[patient.id]}
          patient={patient}
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
