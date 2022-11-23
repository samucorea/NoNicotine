import React, { useState } from 'react'
import { RootScreenProps } from '../routes/MainNavigator'
import { Box, useColorModeValue, Pressable, VStack } from 'native-base'
import { ScreenHeader } from '../components/ScreenHeader'
import theme from '../AppTheme'
import { Dimensions, ImageSourcePropType } from 'react-native'
import { RegularText } from '../components/RegularText'
import { SendButton } from '../components/SendButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScreenContainer, SquaredIconButton } from '../components'
const Cigarette: ImageSourcePropType = require('../../assets/cigarette.png')
const Vape: ImageSourcePropType = require('../../assets/vape.png')
const Cigar: ImageSourcePropType = require('../../assets/cigar.png')
const Hookah: ImageSourcePropType = require('../../assets/hookah.png')

const MethodSelection: React.FC<RootScreenProps<'MethodSelection'>> = ({
  navigation,
}) => {
  return (
    <ScreenContainer>
      <VStack space={10}>
        <Box>
          <ScreenHeader
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
              mb={3}
              borderColor={theme.colors.primary.default}
              label={method.label}
              labelStyle={{ color: theme.colors.primary.default }}
              icon={method.icon}
              onPress={() => {
                // setMethod('CigaretteQuestionnaire')
              }}
            />
          ))}
        </Box>
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

const methods = [
  { label: 'Cigarrillo', icon: Cigarette, navigateTo: '' },
  { label: 'Cigarrillo electrónico', icon: Vape, navigateTo: '' },
  { label: 'Cigarro', icon: Cigar, navigateTo: '' },
  { label: 'Hookah', icon: Hookah, navigateTo: '' },
]

export default MethodSelection
