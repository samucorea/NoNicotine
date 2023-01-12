import React from 'react'
import { Box, Container } from 'native-base'
import { RootScreenProps } from '../../routes/MainNavigator'
import { ScreenHeader, SquaredIconButton } from '../../components'
import theme from '../../AppTheme'
import PatientIcon from '../../../assets/patient.svg'
import TherapistIcon from '../../../assets/therapist-role.svg'
import { Roles } from '../../utils/enums/Roles'
import { useTranslation } from 'react-i18next'

const SelectRole: React.FC<RootScreenProps<'SelectRole'>> = ({
  navigation,
}) => {
  const { t } = useTranslation()

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
        <ScreenHeader title={t('selectRole.title')!} color="#fff" mb={20} />
        <Box
          bg={theme.colors.primary.default}
          flexDirection="row"
          justifyContent={'space-around'}
          w="100%"
        >
          <SquaredIconButton
            label={t('selectRole.patient')!}
            labelStyle={{ color: '#fff' }}
            Icon={PatientIcon}
            bg={theme.colors.primary.default}
            onPress={() =>
              navigation.navigate('Register', { role: Roles.patient })
            }
          />
          <SquaredIconButton
            label={t('selectRole.therapist')!}
            labelStyle={{ color: '#fff' }}
            Icon={TherapistIcon}
            bg={theme.colors.primary.default}
            onPress={() =>
              navigation.navigate('Register', { role: Roles.therapist })
            }
          />
        </Box>
      </Container>
    </Box>
  )
}

export default SelectRole
