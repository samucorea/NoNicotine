import { Text, VStack } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { CustomIconButton, ScreenContainer } from '../../components'
import theme from '../../AppTheme'
import SadFace from '../../../assets/sad_face.svg'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import Chat from './Components/Chat'
import { linkService } from '../../services/linkService'
import { LinkRequest } from '../../models/LinkRequest'
import { useFocus, useModalToggle } from '../../hooks'
import RequestModal from './Components/RequestModal'
import patientService from '../../services/patientService'
import ProfileIcon from '../../../assets/profile.svg'
import { User } from '../../models'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackScreens } from '../../routes/MainNavigator'
import { useTranslation } from 'react-i18next'

type Props = CompositeScreenProps<
  MenuScreenProps<'Therapy'>,
  StackScreenProps<RootStackScreens>
>
const Therapy: FC<Props> = ({ navigation }) => {
  const {
    user: patient,
    token,
    setStoredUser,
  } = useUserContext<PatientContextProps>() ?? {}
  const [linkRequest, setLinkRequest] = useState<LinkRequest>()
  const { show, toggleShow } = useModalToggle()
  const isFocused = useFocus(navigation)
  const { t } = useTranslation()

  useEffect(() => {
    const getLinkRequests = async () => {
      try {
        const response = await linkService.getLinkRequest()

        if (response.data) {
          toggleShow(true)
        }
        setLinkRequest(response.data)
      } catch (error) {
        console.log(
          '🚀 ~ file: Therapy.tsx:18 ~ getLinkRequests ~ error',
          error
        )
      }
    }
    if (isFocused) {
      getLinkRequests()
    }
  }, [isFocused])

  useEffect(() => {
    const navigationOptions = patient?.therapist
      ? {
          headerRight: () => (
            <CustomIconButton
              icon={ProfileIcon}
              pr={'5'}
              onPress={() =>
                navigation.navigate('PreviewProfile', {
                  user: patient.therapist as User,
                })
              }
            />
          ),
        }
      : {}

    navigation.setOptions(navigationOptions)
  }, [patient?.therapist])

  const handleRequestUpdate = async () => {
    console.log('closing')

    try {
      const response = await patientService.getCurrentPatient(token!)

      patient!.therapist = response.data.therapist
      patient!.therapistId = response.data.therapistId

      setStoredUser(patient as User)
    } catch (error) {
      console.log(
        '🚀 ~ file: Therapy.tsx:48 ~ handleRequestUpdate ~ error',
        error
      )
    }
    toggleShow()
  }

  if (linkRequest?.requestAccepted == null && show) {
    return (
      <RequestModal
        show={show}
        toggleShow={() => handleRequestUpdate()}
        request={linkRequest!}
      />
    )
  }

  if (!patient?.therapist) {
    // if (false) {
    return (
      <ScreenContainer>
        <VStack alignItems="center" justifyContent="center" flex={1} space={4}>
          <SadFace />
          <Text
            fontSize="2xl"
            textAlign="center"
            color={theme.colors.primary.default}
            bold
          >
            Lo sentimos...
          </Text>
          <Text
            textAlign="center"
            fontSize="lg"
            color={theme.colors.primary.default}
          >
            Debes estar vinculado a un terapeuta para acceder a esta pestaña
          </Text>
        </VStack>
      </ScreenContainer>
    )
  }

  return <Chat />
}

export default Therapy
