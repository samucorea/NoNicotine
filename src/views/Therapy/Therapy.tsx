import { Box, Text, VStack, HStack, Image } from 'native-base'
import React from 'react'
import theme from '../../AppTheme'
import { ScreenContainer, SendButton } from '../../components'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import Unlinked from './partials/Unlinked'
const ProfileIcon = require('../../../assets/profile-big.png')

const Therapy: React.FC<MenuScreenProps<'Therapy'>> = () => {
  return (
    <ScreenContainer>
      <Box
        alignSelf="center"
        width={'100%'}
        height={'100%'}
        justifyContent="center"
        paddingX={8}
      >
        <VStack alignItems={'center'} w="100%" mb={5}>
          <Image source={ProfileIcon} size="lg" alt="profile_icon" />
          <Text bold fontSize={28} color={theme.colors.primary.default}>
            John Doe
          </Text>
        </VStack>
        <Box alignItems={'flex-start'}>
          <Text fontSize={16} color={theme.colors.primary.default} paddingY={4}>
            Correo electrónico
          </Text>
          <Text bold fontSize={18} color={theme.colors.primary.default}>
            johndoe@email.com
          </Text>
        </Box>
        <HStack paddingY={4}>
          <VStack>
            <Text fontSize={16} color={theme.colors.primary.default}>
              Edad
            </Text>
            <Text
              bold
              fontSize={18}
              color={theme.colors.primary.default}
              paddingY={4}
            >
              37
            </Text>
          </VStack>
          <VStack marginLeft={16}>
            <Text fontSize={16} color={theme.colors.primary.default}>
              Sexo
            </Text>
            <Text
              bold
              fontSize={18}
              color={theme.colors.primary.default}
              paddingY={4}
            >
              M
            </Text>
          </VStack>
        </HStack>
        <SendButton text="Desvincular" bg="#ef756d" mb={10} />
      </Box>
    </ScreenContainer>
  )
}

export default Therapy
