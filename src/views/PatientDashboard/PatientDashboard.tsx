import { Box, Fab, Image, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import theme from '../../AppTheme'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import AbstinenceRecord from './Components/AbstinenceRecord'
import InfoSection, { InfoSectionProps } from './Components/InfoSection'

const Heart = require('../../../assets/heart.png')
const DollarSign = require('../../../assets/dollar-sign.png')
const Information = require('../../../assets/information.png')
const Inhale = require('../../../assets/inhale.png')
const Pencil = require('../../../assets/pencil.png')

const PatientDashboard: FC<MenuScreenProps<'PatientDashboard'>> = () => {
  const infoItems: InfoSectionProps[] = [
    {
      sectionTitle: 'Ahorro econónmico',
      sectionItems: [
        {
          content: (
            <Text bold fontSize={'xl'}>
              400 DOP
            </Text>
          ),
          leftIcon: DollarSign,
        },
      ],
    },
    {
      sectionTitle: 'Beneficios de salud',
      sectionItems: [
        {
          content: (
            <Text fontSize={'md'} bold>
              Reducción del ritmo cardíaco
            </Text>
          ),
          leftIcon: Heart,
          rigthIcon: Information,
        },
        {
          content: (
            <Text fontSize={'md'} bold>
              Mejor sentido del olfato
            </Text>
          ),
          leftIcon: Inhale,
          rigthIcon: Information,
        },
      ],
    },
  ]

  return (
    <Box flex={1} p={'8'} pt={'0'}>
      <Box flex={4} alignSelf="center">
        <AbstinenceRecord abstinenceDays={2} />
      </Box>
      <VStack flex={5}>
        {infoItems.map((item, index) => (
          <InfoSection key={index} {...item} />
        ))}
      </VStack>
      <Fab
        bg={theme.colors.primary.default}
        icon={
          <Image
            bg={theme.colors.primary.default}
            size="5"
            source={Pencil}
            alt="edit"
          />
        }
        bottom={90}
      />
    </Box>
  )
}

export default PatientDashboard
