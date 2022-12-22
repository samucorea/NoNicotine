import { HStack, Pressable, Text, VStack } from 'native-base'
import React, { FC } from 'react'

interface Props {
  onPress?: () => void
  title: string
  subTitle: string
  rightIcon?: JSX.Element
  leftIcon?: JSX.Element

  // data: any
}

const StackButton: FC<Props> = ({
  onPress,
  title,
  subTitle,
  rightIcon,
  leftIcon,
}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack justifyContent={'space-between'} p={4} alignItems={'center'}>
        {leftIcon}
        <VStack w="87%" space={1}>
          <Text
            fontWeight={'400'}
            textTransform={'capitalize'}
            letterSpacing={0.5}
            fontSize="md"
          >
            {title}
          </Text>
          <Text color={'#8f8f8f'} numberOfLines={1}>
            {subTitle}
          </Text>
        </VStack>
        {rightIcon}
      </HStack>
    </Pressable>
  )
}

export default StackButton
