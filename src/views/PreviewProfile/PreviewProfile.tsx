import { HStack, Text, VStack } from 'native-base'
import React from 'react'
import theme from '../../AppTheme'
import { ScreenContainer, SendButton } from '../../components'
import { RootScreenProps } from '../../routes/MainNavigator'
import ProfileIcon from '../../../assets/profile.svg'
import moment from 'moment'
import { useUserContext } from '../../contexts/UserContext'
import { Roles } from '../../utils/enums/Roles'
import { linkService } from '../../services/linkService'
import { Patient, Therapist } from '../../models'

const PreviewProfile: React.FC<RootScreenProps<'PreviewProfile'>> = ({
  route: {
    params: { user },
  },
  navigation,
}) => {
  const { user: loggedUser, setStoredUser } = useUserContext()
  const desvinculate = async () => {
    const userId = loggedUser?.role == Roles.therapist ? loggedUser.id : user.id
    const patientId =
      loggedUser?.role == Roles.therapist ? user.id : loggedUser!.id

    console.log(
      '🚀 ~ file: PreviewProfile.tsx:22 ~ desvinculate ~ userId',
      { userId },
      { patientId }
    )

    try {
      await linkService.unLink(userId, patientId)

      if (loggedUser?.role == Roles.patient) {
        const patient = loggedUser as Patient

        patient.therapist = undefined

        patient.therapistId = undefined

        setStoredUser(patient)
      } else {
        const therapist = loggedUser as Therapist

        const patientIndex = therapist.patients.findIndex(
          (patient) => patient.id == user.id
        )

        therapist.patients.splice(patientIndex, 1)

        setStoredUser(therapist)
      }

      navigation.goBack()
    } catch (error: any) {
      console.log(
        '🚀 ~ file: PreviewProfile.tsx:21 ~ desvinculate ~ error',
        error.response.data
      )
    }
  }

  return (
    <ScreenContainer>
      <VStack alignItems={'center'} w="100%" mb={10}>
        <ProfileIcon width={100} height={100} />
        <Text bold fontSize={28} color={theme.colors.primary.default}>
          {user.name}
        </Text>
      </VStack>
      <VStack space={5} flexGrow={1} position="relative">
        <VStack variant="previewVStack">
          <Text variant="previewLabel">Correo electrónico</Text>
          <Text variant="previewValue">juanperez@email.com</Text>
        </VStack>
        <HStack space={10}>
          <VStack variant="previewVStack">
            <Text variant="previewLabel">Edad</Text>
            <Text variant="previewValue">
              {moment().diff(user.birthDate, 'years')}
            </Text>
          </VStack>
          <VStack variant="previewVStack">
            <Text variant="previewLabel">Sexo</Text>
            <Text variant="previewValue">{user.sex}</Text>
          </VStack>
        </HStack>
        {loggedUser?.role == Roles.therapist && (
          <HStack space={10}>
            <VStack variant="previewVStack">
              <Text variant="previewLabel">Método de consumo</Text>
              <Text variant="previewValue">Cigarrillo</Text>
            </VStack>
            <VStack variant="previewVStack">
              <Text variant="previewLabel">Frecuencia</Text>
              <Text variant="previewValue">5 por día</Text>
            </VStack>
          </HStack>
        )}
      </VStack>
      <SendButton
        text="Desvincular"
        onPress={() => desvinculate()}
        bg="#ef756d"
        mb={10}
      />
    </ScreenContainer>
  )
}

export default PreviewProfile
