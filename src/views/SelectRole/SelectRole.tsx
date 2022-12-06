import React from 'react'
import { Box, Container } from 'native-base'
import { RootScreenProps } from '../../routes/MainNavigator'
import { ScreenHeader, SquaredIconButton } from '../../components'
import theme from '../../AppTheme'
import PatientIcon from '../../../assets/patient.svg'
import TherapistIcon from '../../../assets/therapist-role.svg'

const SelectRole: React.FC<RootScreenProps<'SelectRole'>> = ({
  navigation,
}) => {
  return (
    <Box
      bg={theme.colors.primary.default}
      flex={1}
      alignItems="center"
      flexDirection="column"
    >
      <Container
        bg={theme.colors.primary.default}
        flex={1}
        justifyContent="center"
      >
        <ScreenHeader title="Selecciona tu rol" color="#fff" mb={20} />
        <Box
          bg={theme.colors.primary.default}
          flexDirection="row"
          justifyContent={'space-around'}
          w="100%"
        >
          <SquaredIconButton
            label="Paciente"
            labelStyle={{ color: '#fff' }}
            Icon={PatientIcon}
            bg={theme.colors.primary.default}
            onPress={() => navigation.navigate('Register', { role: 'patient' })}
          />
          <SquaredIconButton
            label="Terapeuta"
            labelStyle={{ color: '#fff' }}
            Icon={TherapistIcon}
            bg={theme.colors.primary.default}
            onPress={() =>
              navigation.navigate('Register', { role: 'therapist' })
            }
          />
        </Box>
      </Container>
    </Box>
  )
}

export default SelectRole
