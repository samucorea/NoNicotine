import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import moment from 'moment'
import { Box, Fab, Image, Text, VStack } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import theme from '../../AppTheme'
import { useUserContext } from '../../contexts/UserContext'
import { Patient } from '../../models'
import { RootStackScreens } from '../../routes/MainNavigator'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import patientService from '../../services/patientService'
import AbstinenceRecord from './Components/AbstinenceRecord'
import InfoSection, { InfoSectionProps } from './Components/InfoSection'

const Heart = require('../../../assets/heart.png')
const DollarSign = require('../../../assets/dollar-sign.png')
const Information = require('../../../assets/information.png')
const Inhale = require('../../../assets/inhale.png')
const Pencil = require('../../../assets/pencil.png')

type Props = CompositeScreenProps<
  MenuScreenProps<'PatientDashboard'>,
  StackScreenProps<RootStackScreens>
>

const PatientDashboard: FC<Props> = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(true)
  const [consumptionExpenses, setConsumptionExpenses] = useState<any>()

  const { user } = useUserContext() ?? {}

  const patient = user as Patient

  const abstinenceDays = moment(patient?.startTime).diff(moment(), 'days')

  useEffect(() => {
    navigation.addListener('focus', () => setIsFocused(true))
    navigation.addListener('blur', () => setIsFocused(false))

    const getConsumptionMethods = async () => {
      // const response = await patientService.getConsumptionMethods(
      //   patient.patientConsumptionMethodsId!

      // )

      try {
        const response = await patientService.getConsumptionExpenses(
          patient.patientConsumptionMethodsId!
        )

        setConsumptionExpenses(response.data)
      } catch (error) {
        console.log(
          '🚀 ~ file: PatientDashboard.tsx ~ line 47 ~ getConsumptionMethods ~ error',
          error
        )
      }

      setLoading(false)
      // .then((response) => {
      //   console.log('data', response.data)
      // })
      // .catch((reason) => {
      //   console.log(reason.)
      // })
    }
    getConsumptionMethods()
  }, [])

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

  if (loading) {
    return null
  }

  if (consumptionExpenses?.value == 0) {
    navigation.navigate('MethodSelection', { firstTime: true })
  }

  return (
    <Box flex={1} p={'8'} pt={'0'}>
      <Box flex={4} alignSelf="center">
        <AbstinenceRecord abstinenceDays={abstinenceDays} />
      </Box>
      <VStack flex={5}>
        {infoItems.map((item, index) => (
          <InfoSection key={index} {...item} />
        ))}
      </VStack>
      {isFocused && (
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
      )}
    </Box>
  )
}

export default PatientDashboard
