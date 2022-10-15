import React from 'react'
import { RootScreenProps } from '../routes/MainNavigator'
import { Box, useColorModeValue, Pressable } from 'native-base'
import { ScreenHeader } from '../components/ScreenHeader'
import theme from '../AppTheme'
import { Dimensions, ImageSourcePropType } from 'react-native'
import { RegularText } from '../components/RegularText'
import { SendButton } from '../components/SendButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SquaredIconButton } from '../components'
const Cigarette: ImageSourcePropType = require('../../assets/cigarette.png')
const Vape: ImageSourcePropType = require('../../assets/vape.png')
const Cigar: ImageSourcePropType = require('../../assets/cigar.png')
const Hookah: ImageSourcePropType = require('../../assets/hookah.png')

const MethodSelection: React.FC<RootScreenProps<'MethodSelection'>> = ({
  navigation,
}) => {
  return (
    <Box
      display="flex"
      alignSelf="center"
      alignItems="center"
      flexDirection="column"
      width={Dimensions.get('window').width}
      height={Dimensions.get('window').height}
    >
      <Pressable
        alignSelf="flex-start"
        marginTop="22px"
        marginLeft="22px"
        onPress={navigation.goBack}
      >
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
          <ScreenHeader
            title="Selecciona tus métodos de consumo"
            fontSize={24}
          />
          <RegularText>Ayúdanos a conocer un poco más sobre tí...</RegularText>
        </Box>
        <Box
          alignSelf="center"
          alignItems="flex-start"
          justifyContent="center"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
        >
          <SquaredIconButton
            borderColor={theme.colors.primary.default}
            borderWidth={'3'}
            margin="5px"
            label="Cigarrillo"
            labelStyle={{ color: theme.colors.primary.default }}
            icon={Cigarette}
          />
          <SquaredIconButton
            borderColor={theme.colors.primary.default}
            borderWidth={'3'}
            margin="5px"
            label="Vape"
            labelStyle={{ color: theme.colors.primary.default }}
            icon={Vape}
          />
          <SquaredIconButton
            borderColor={theme.colors.primary.default}
            borderWidth={'3'}
            margin="5px"
            label="Cigarro"
            labelStyle={{ color: theme.colors.primary.default }}
            icon={Cigar}
          />
          <SquaredIconButton
            borderColor={theme.colors.primary.default}
            borderWidth={'3'}
            margin="5px"
            label="Hookah"
            labelStyle={{ color: theme.colors.primary.default }}
            icon={Hookah}
          />
          {/* <CustomIconButton icon={Cigarette} />
          <CustomIconButton icon={Vape} />
          <CustomIconButton icon={Cigar} />
          <CustomIconButton icon={Hookah} /> */}
        </Box>
        <SendButton
          onPress={() => {
            navigation.navigate('Menu')
          }}
          text="Continuar"
        />
      </Box>
    </Box>
  )
}

export default MethodSelection
