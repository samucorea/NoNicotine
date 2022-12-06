import { HStack, Text, VStack } from 'native-base'
import React from 'react'
import theme from '../../AppTheme'
import { ScreenContainer, SendButton } from '../../components'
import { RootScreenProps } from '../../routes/MainNavigator'
import ProfileIcon from '../../../assets/profile.svg'

const PreviewProfile: React.FC<RootScreenProps<'PreviewProfile'>> = ({
  route,
  navigation,
}) => {
  const desvinculate = () => {}
  return (
    <ScreenContainer>
      <VStack alignItems={'center'} w="100%" mb={10}>
        <ProfileIcon width={100} height={100} />
        <Text bold fontSize={28} color={theme.colors.primary.default}>
          Mario Almanzar
        </Text>
      </VStack>
      <VStack space={5} flexGrow={1} position="relative">
        <VStack variant="previewVStack">
          <Text variant="previewLabel">Correo electrónico</Text>
          <Text variant="previewValue">juanperez@email.com</Text>
        </VStack>
        <HStack space={10}>
          <VStack variant="previewVStack">
            <Text variant="previewLabel">Edad</Text>
            <Text variant="previewValue">25</Text>
          </VStack>
          <VStack variant="previewVStack">
            <Text variant="previewLabel">Sexo</Text>
            <Text variant="previewValue">M</Text>
          </VStack>
        </HStack>
        <HStack space={10}>
          <VStack variant="previewVStack">
            <Text variant="previewLabel">Método de consumo</Text>
            <Text variant="previewValue">Cigarrillo</Text>
          </VStack>
          <VStack variant="previewVStack">
            <Text variant="previewLabel">Frecuencia</Text>
            <Text variant="previewValue">5 por día</Text>
          </VStack>
        </HStack>
      </VStack>
      <SendButton
        text="Desvincular"
        onPress={() => desvinculate()}
        bg="#ef756d"
        mb={10}
      />
    </ScreenContainer>
  )
}

export default PreviewProfile
