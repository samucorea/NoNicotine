import { HStack, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import theme from '../../../AppTheme'
import SymptomButton from './SymptomButton'

interface Props {
  title: string
  symptoms: string[]
  selectedSymptoms: string[]
  read?: boolean
  setSelectedSymptoms: (values: string[]) => void
}

interface SelectionVerify {
  isSelected: boolean
  index: number
}

const SymptomSelection: FC<Props> = ({
  title,
  symptoms,
  setSelectedSymptoms,
  selectedSymptoms,
  read = false,
}) => {
  const OnSymptomPressed = (
    index: number,
    selectionVerify: SelectionVerify
  ) => {
    const selectedTMP = JSON.parse(JSON.stringify(selectedSymptoms))

    if (selectionVerify.isSelected) {
      selectedTMP.splice(selectionVerify.index, 1)
    } else {
      selectedTMP.push(symptoms[index])
    }

    setSelectedSymptoms(selectedTMP)
  }

  const isSymptomSelected = (index: number): SelectionVerify => {
    const symptomIndex = selectedSymptoms.findIndex(
      (symptom) => symptom === symptoms[index]
    )

    if (symptomIndex === -1) {
      return { isSelected: false, index: symptomIndex }
    }

    return { isSelected: true, index: symptomIndex }
  }

  return (
    <VStack space={5} pt={2} pb={5} px={4}>
      <Text color={theme.colors.primary.default} bold fontSize={'md'}>
        {title}
      </Text>
      <HStack flexWrap={'wrap'} space={4}>
        {symptoms.map((symptom, index) => {
          const selectionVerify = isSymptomSelected(index)

          return (
            <SymptomButton
              isSelected={selectionVerify.isSelected}
              onPress={() =>
                read ? undefined : OnSymptomPressed(index, selectionVerify)
              }
              key={index}
              symptom={symptom}
            />
          )
        })}
      </HStack>
    </VStack>
  )
}

export default SymptomSelection
