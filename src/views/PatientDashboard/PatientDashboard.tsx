import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import moment from 'moment'
import { Box, Fab, Image, ScrollView, Text, VStack } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import theme from '../../AppTheme'
import { PatientContextProps, useUserContext } from '../../contexts/UserContext'
import { ConsumptionExpenses } from '../../models'
import { PatientConsumptionMethods } from '../../models/Patient'
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

const methodExpenses = {
  cigar: 'cigarTotal',
  cigarette: 'cigaretteTotal',
  electronicCigarette: 'electronicCigaretteTotal',
  hookah: 'hookaTotal',
}

const PatientDashboard: FC<Props> = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(true)
  const [consumptionExpenses, setConsumptionExpenses] =
    useState<ConsumptionExpenses>()

  const { t } = useTranslation()
  const { user: patient } = useUserContext<PatientContextProps>() ?? {}

  const abstinenceDays = moment().diff(moment(patient?.startTime), 'days')

  useEffect(() => {
    navigation.addListener('focus', () => setIsFocused(true))
    navigation.addListener('blur', () => setIsFocused(false))

    const getConsumptionMethods = async () => {
      try {
        const response = await patientService.getConsumptionExpenses()

        setConsumptionExpenses(response.data)
      } catch (error: any) {
        console.log(
          '🚀 ~ file: PatientDashboard.tsx ~ line 47 ~ getConsumptionMethods ~ error',
          error.response.data
        )
      }

      setLoading(false)
    }
    getConsumptionMethods()
  }, [])

  const expenseArray = []

  if (!loading) {
    for (const key in methodExpenses) {
      if (
        patient!.patientConsumptionMethods![
          key as keyof PatientConsumptionMethods
        ] !== null
      ) {
        expenseArray.push({
          subContent: true,
          content: (
            <Text bg={'transparent'} bold fontSize={'xl'}>
              {consumptionExpenses?.[key as keyof ConsumptionExpenses]} DOP
            </Text>
          ),
        })
      }
    }
  }

  console.log('expenses', consumptionExpenses)

  const infoItems: InfoSectionProps[] = [
    {
      sectionTitle: t('patientDashboard.savingsTitle')!,
      sectionItems: [
        {
          content: (
            <Text bold fontSize={'xl'}>
              {consumptionExpenses?.total} DOP
            </Text>
          ),
          leftIcon: DollarSign,
        },
        ...expenseArray,
      ],
    },
    {
      sectionTitle: t('patientDashboard.benefits.title')!,
      sectionItems: [
        {
          content: (
            <Text fontSize={'md'} bold>
              {t('patientDashboard.benefits.cardiacReduction')!}
            </Text>
          ),
          leftIcon: Heart,
          rigthIcon: Information,
        },
        {
          content: (
            <Text fontSize={'md'} bold>
              {t('patientDashboard.benefits.betterSmell')!}
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

  let areMethodsNull = 0

  for (const key in patient?.patientConsumptionMethods) {
    if (
      patient?.patientConsumptionMethods[
        key as keyof PatientConsumptionMethods
      ] == null
    ) {
      areMethodsNull += 1
    }

    if (areMethodsNull == 4) {
      navigation.navigate('MethodSelection', { firstTime: true })
      return null
    }
  }

  return (
    <ScrollView flex={1} p={'8'} pt={'0'} bg="#ffffff">
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
    </ScrollView>
  )
}

export default PatientDashboard
