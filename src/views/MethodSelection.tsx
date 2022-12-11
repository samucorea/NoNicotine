import React, { useState } from 'react'
import { RootScreenProps } from '../routes/MainNavigator'
import { Box, IconButton, VStack } from 'native-base'
import { ScreenHeader } from '../components/ScreenHeader'
import theme from '../AppTheme'
import { RegularText } from '../components/RegularText'
import { ScreenContainer, SendButton, SquaredIconButton } from '../components'
import Cigarette from '../../assets/cigarette.svg'
import Vape from '../../assets/vape.svg'
import Cigar from '../../assets/cigar.svg'
import Hookah from '../../assets/hookah.svg'
import EditDots from '../../assets/editDots.svg'
import AddIcon from '../../assets/add.svg'
import { PatientContextProps, useUserContext } from '../contexts/UserContext'
import { PatientConsumptionMethods } from '../models/Patient'

const methodDetails: { [key: string]: string } = {
  cigarDetails: 'CigarQuestionnaire',
  cigaretteDetails: 'CigaretteQuestionnaire',
  electronicCigaretteDetails: 'VapeQuestionnaire',
  hookahDetails: 'HookahQuestionnaire',
}

const MethodSelection: React.FC<RootScreenProps<'MethodSelection'>> = ({
  navigation,
  route: {
    params: { firstTime },
  },
}) => {
  const { user } = useUserContext<PatientContextProps>()

  const initialSelected = []

  if (!firstTime) {
    for (const key in methodDetails) {
      if (
        user?.patientConsumptionMethods?.[
          key as keyof PatientConsumptionMethods
        ] !== null
      ) {
        initialSelected.push(methodDetails[key])
      }
    }
  }

  const [selectedMethods, setSelectedMethods] =
    useState<string[]>(initialSelected)
  console.log(
    '🚀 ~ file: MethodSelection.tsx:47 ~ selectedMethods',
    selectedMethods
  )

  const selectMethod = (methodName: string) => {
    const methodIndex = selectedMethods.findIndex(
      (element) => element == methodName
    )

    if (methodIndex == -1) {
      return setSelectedMethods([...selectedMethods, methodName])
    }

    const selectedMethodsTMP = JSON.parse(JSON.stringify(selectedMethods))
    selectedMethodsTMP.splice(methodIndex, 1)
    setSelectedMethods(selectedMethodsTMP)
  }

  const handleSend = () => {
    navigation.navigate(selectedMethods.pop() as any, {
      nextQuestionnaires: selectedMethods,
    })
  }

  const handlePress = (name: any) => {
    if (firstTime) {
      return selectMethod(name)
    }

    const isMethod = selectedMethods.find((element) => element == name)

    let params: { [key: string]: boolean } = { edit: true }

    if (!isMethod) {
      params = { add: true }
    }

    navigation.navigate(name, params)
  }

  const handleOpacityStyle = (methodName: string) => {
    const isMethod = selectedMethods.find((element) => element == methodName)

    if ((firstTime && isMethod) || (!firstTime && !isMethod)) {
      return selectedStyle
    }

    return {}
  }

  return (
    <ScreenContainer>
      <VStack space={10} h="full" justifyContent={'center'}>
        <Box position={'absolute'} top={16} w="full">
          <ScreenHeader
            alignSelf={firstTime ? 'flex-start' : 'center'}
            title={
              firstTime
                ? 'Selecciona tus métodos de consumo'
                : 'Tus métodos de consumo'
            }
            fontSize={28}
          />
          {firstTime && (
            <RegularText>
              Ayúdanos a conocer un poco más sobre tí...
            </RegularText>
          )}
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          justifyContent={'space-between'}
        >
          {methods.map((method, index) => {
            const style = handleOpacityStyle(method.name)

            return (
              <SquaredIconButton
                key={index}
                mb={5}
                w={'46%'}
                topRigthButton={
                  <Box p={2}>
                    {!firstTime && Object.keys(style).length == 0 ? (
                      <EditDots />
                    ) : (
                      <AddIcon />
                    )}
                  </Box>
                }
                borderColor={theme.colors.primary.default}
                label={method.label}
                labelStyle={{ color: theme.colors.primary.default }}
                Icon={method.icon}
                iconProps={{ color: theme.colors.primary.default }}
                onPress={() => handlePress(method.name)}
                {...style}
              />
            )
          })}
        </Box>
        <SendButton
          text={firstTime ? 'Continuar' : 'Guardar'}
          fontSize={'lg'}
          onPress={handleSend}
          position="absolute"
          bottom={20}
        />
      </VStack>
    </ScreenContainer>
  )
}

const selectedStyle = {
  shadow: 0,
  iconProps: { color: '#94a4ba' },
  borderColor: '#94a4ba',
  labelStyle: { color: '#94a4ba' },
}

const methods = [
  {
    name: 'CigaretteQuestionnaire',
    label: 'Cigarrillo',
    icon: Cigarette,
    navigateTo: '',
  },
  {
    name: 'VapeQuestionnaire',
    label: 'Cigarrillo electrónico',
    icon: Vape,
    navigateTo: '',
  },
  { name: 'CigarQuestionnaire', label: 'Cigarro', icon: Cigar, navigateTo: '' },
  {
    name: 'HookahQuestionnaire',
    label: 'Hookah',
    icon: Hookah,
    navigateTo: '',
  },
]

export default MethodSelection
