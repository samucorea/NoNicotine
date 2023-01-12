import { Box, Center, Text } from 'native-base'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  abstinenceDays: number
}

const AbstinenceRecord: FC<Props> = ({ abstinenceDays }) => {
  const { t } = useTranslation()

  return (
    <Box height={'64'} width={'64'} rounded={'full'} bg="#d6e6fb" p={'9px'}>
      <Box flex={1} rounded={'full'} bg="#cadefa" p={'9px'}>
        <Center flex={1} rounded={'full'} bg="#a8c6ef">
          <Text color={'#fff'} fontSize={'8xl'}>
            {abstinenceDays}d
          </Text>
          <Text color={'#fff'} fontSize={'xl'}>
            {t('patientDashboard.noConsumption')!}
          </Text>
        </Center>
      </Box>
    </Box>
  )
}

export default AbstinenceRecord
