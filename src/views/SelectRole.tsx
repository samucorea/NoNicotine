import React from 'react'
import { Box, Container, HStack, VStack } from 'native-base'
import { RootScreenProps } from '../routes/MainNavigator'
import { ScreenHeader, SquaredIconButton } from '../components'
import theme from '../AppTheme'

const PatientIcon = require('../../assets/patient.png')

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
            height={'43%'}
            width={'43%'}
            labelStyle={{ color: '#fff' }}
            icon={PatientIcon}
            bg={theme.colors.primary.default}
            onPress={() => navigation.navigate('Register', { role: 'patient' })}
          />
          <SquaredIconButton
            label="Paciente"
            height={'43%'}
            width={'43%'}
            labelStyle={{ color: '#fff' }}
            icon={PatientIcon}
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
