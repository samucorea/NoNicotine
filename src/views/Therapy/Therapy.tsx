import { Text, VStack } from 'native-base'
import React, { FC } from 'react'
import { ScreenContainer } from '../../components'
import theme from '../../AppTheme'
import SadFace from '../../../assets/sad_face.svg'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import Chat from './Components/Chat'

const Therapy: FC<MenuScreenProps<'Therapy'>> = () => {
  const { user: patient } = useUserContext<PatientContextProps>() ?? {}

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
