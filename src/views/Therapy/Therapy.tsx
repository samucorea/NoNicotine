import { Text, VStack } from 'native-base'
import React from 'react'
import { ScreenContainer } from '../../components'
import theme from '../../AppTheme'
import SadFace from '../../../assets/sad_face.svg'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'
const Therapy = () => {
  const { user: patient } = useUserContext<PatientContextProps>() ?? {}

  if (!patient?.therapist) {
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
}

export default Therapy
