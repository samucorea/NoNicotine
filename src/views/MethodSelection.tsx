import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackScreens } from '../routes/MainNavigator'
import { Box, useColorModeValue, Pressable } from 'native-base'
import { SectionHeader } from '../components/SectionHeader'
import theme from '../AppTheme'
import { Dimensions, ImageSourcePropType } from 'react-native'
import { RegularText } from '../components/RegularText'
import { SendButton } from '../components/SendButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SelectionIcon } from '../components/SelectionIcon'

const Cigarette: ImageSourcePropType = require('../../assets/cigarette.png')
const Vape: ImageSourcePropType = require('../../assets/vape.png')
const Cigar: ImageSourcePropType = require('../../assets/cigar.png')
const Hookah: ImageSourcePropType = require('../../assets/hookah.png')

type Props = NativeStackScreenProps<RootStackScreens, 'MethodSelection'>

const MethodSelection: React.FC<Props> = () => {
  return (
    <Box
      display="flex"
      alignSelf="center"
      alignItems="center"
      flexDirection="column"
      width={Dimensions.get('window').width}
      height={Dimensions.get('window').height}
    >
      <Pressable alignSelf="flex-start" marginTop="22px" marginLeft="22px">
        <Ionicons
          name="arrow-back"
          size={32}
          color={useColorModeValue(
            theme.colors.primary.default,
            theme.colors.primary.light
          )}
        ></Ionicons>
      </Pressable>
      <Box paddingX="24px">
        <Box alignSelf="center" display="flex" marginY="32px">
          <SectionHeader
            sectionHeaderContent="Selecciona tus métodos de consumo"
            sectionHeaderFontSize={24}
          />
          <RegularText RegularTextContent="Ayúdanos a conocer un poco más sobre tí..." />
        </Box>
        <Box alignSelf="center" display="flex">
          <SelectionIcon SelectionIconContent={Cigarette} />
          <SelectionIcon SelectionIconContent={Vape} />
          <SelectionIcon SelectionIconContent={Cigar} />
          <SelectionIcon SelectionIconContent={Hookah} />
        </Box>
        <SendButton buttonContent="Continuar" />
      </Box>
    </Box>
  )
}

export default MethodSelection
