import React, { useState } from 'react'
import { RootScreenProps } from '../routes/MainNavigator'
import { Box, VStack } from 'native-base'
import { ScreenHeader } from '../components/ScreenHeader'
import theme from '../AppTheme'
import { RegularText } from '../components/RegularText'
import { ScreenContainer, SendButton, SquaredIconButton } from '../components'
import Cigarette from '../../assets/cigarette.svg'
import Vape from '../../assets/vape.svg'
import Cigar from '../../assets/cigar.svg'
import Hookah from '../../assets/hookah.svg'

const MethodSelection: React.FC<RootScreenProps<'MethodSelection'>> = ({
  navigation,
}) => {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])

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

  return (
    <ScreenContainer>
      <VStack space={10}>
        <Box>
          <ScreenHeader
            alignSelf={'flex-start'}
            title="Selecciona tus métodos de consumo"
            fontSize={24}
          />
          <RegularText>Ayúdanos a conocer un poco más sobre tí...</RegularText>
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          justifyContent={'space-between'}
        >
          {methods.map((method, index) => (
            <SquaredIconButton
              key={index}
              mb={5}
              w={'46%'}
              borderColor={theme.colors.primary.default}
              label={method.label}
              labelStyle={{ color: theme.colors.primary.default }}
              Icon={method.icon}
              iconProps={{ color: theme.colors.primary.default }}
              {...(selectedMethods.find(
                (element) => element == method.name
              ) && { ...selectedStyle })}
              onPress={() => {
                selectMethod(method.name)
              }}
            />
          ))}
        </Box>
        <SendButton
          text="Continuar"
          fontSize={'lg'}
          onPress={() =>
            navigation.navigate(selectedMethods.pop() as any, {
              nextQuestionnaires: selectedMethods,
            })
          }
        />
        {/* <SendButton
          onPress={() => {
            if (Method === 'CigaretteQuestionnaire') {
              navigation.navigate('CigaretteQuestionnaire')
            }
            if (Method === 'CigarQuestionnaire') {
              navigation.navigate('CigarQuestionnaire')
            }
            if (Method === 'VapeQuestionnaire') {
              navigation.navigate('VapeQuestionnaire')
            }
            if (Method === 'HookahQuestionnaire') {
              navigation.navigate('HookahQuestionnaire')
            }
          }}
          text="Continuar"
        /> */}
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
