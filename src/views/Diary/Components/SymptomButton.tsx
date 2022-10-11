import { Pressable, Text } from 'native-base'
import React, { FC } from 'react'

interface Props {
  symptom: string
  isSelected: boolean
  onPress: () => void
}

const SymptomButton: FC<Props> = ({ symptom, onPress, isSelected }) => {
  const selectedAccent = '#949494'
  const normalAccent = '#000'

  return (
    <Pressable
      p={1}
      px={2}
      bg={'#f8f8f8'}
      shadow={isSelected ? undefined : 9}
      borderWidth={1}
      borderColor={isSelected ? selectedAccent : normalAccent}
      rounded={6}
      onPress={onPress}
    >
      <Text color={isSelected ? selectedAccent : normalAccent}>{symptom}</Text>
    </Pressable>
  )
}

export default SymptomButton
