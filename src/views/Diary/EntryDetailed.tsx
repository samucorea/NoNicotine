import { Box, Checkbox, Text, TextArea } from 'native-base'
import React, { FC, useState } from 'react'
import theme from '../../AppTheme'
import {
  HideKeyboardOnForms,
  SendButton,
  VStackContainer,
} from '../../components'
import { useUserContext } from '../../contexts/UserContext'
import { CreateDiaryEntry } from '../../models'
import { DiaryScreenProps } from '../../routes/Diary/DiaryNavigator'
import diaryEntryService from '../../services/diaryEntryService'
import SymptomSelection from './Components/SymptomSelection'

const EntryDetailed: FC<DiaryScreenProps<'EntryDetailed'>> = ({
  navigation,
  route: {
    params: { entry },
  },
}) => {
  console.log(entry)

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    entry ? entry.symptoms : []
  )
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>(
    entry ? entry.feelings : []
  )
  const [description, setDescription] = useState<string>(
    entry ? entry.message : ''
  )
  const [checked, setChecked] = useState(true)
  const userContext = useUserContext()

  const symptoms = ['tired', 'headache']
  const feelings = ['happy', 'sad']

  const handleSubmit = async () => {
    if (userContext?.user) {
      const entryTMP: CreateDiaryEntry = {
        feelings: selectedFeelings,
        symptoms: selectedSymptoms,
        message: description,
        therapistAllowed: checked,
      }

      diaryEntryService.create(entryTMP)

      navigation.goBack()
    }
  }
  const create = entry === undefined

  const currentTitles = titles[create ? 'create' : 'read']

  return (
    <HideKeyboardOnForms>
      <VStackContainer scroll={false}>
        <SymptomSelection
          create={create}
          title={currentTitles.symptoms}
          symptoms={create ? symptoms : selectedSymptoms}
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
        />
        <SymptomSelection
          create={create}
          title={currentTitles.feelings}
          symptoms={create ? feelings : selectedFeelings}
          selectedSymptoms={selectedFeelings}
          setSelectedSymptoms={setSelectedFeelings}
        />
        <Box pt={2} pb={5} px={4} flex={6}>
          <Text color={theme.colors.primary.default} bold fontSize={'md'}>
            {currentTitles.description}
          </Text>
          <TextArea
            placeholder="Siéntete libre de escribir lo que quieras..."
            autoCompleteType={false}
            isDisabled={!create}
            px={0}
            borderWidth={0}
            color={theme.colors.primary.default}
            placeholderTextColor="#94a4ba"
            onChangeText={(text) => setDescription(text)}
            value={description}
            _focus={{ bg: '#fff ' }}
          />
        </Box>
        <Box p={4} flexGrow={1} justifyContent={'space-between'}>
          <Checkbox
            isDisabled={!create}
            value={'checked'}
            isChecked={checked}
            onChange={(isChecked) => setChecked(isChecked)}
            _checked={{
              bg: theme.colors.primary.default,
              borderColor: theme.colors.primary.default,
            }}
            _text={{ color: '#8f8f8f' }}
          >
            Compartir con tu terapeuta
          </Checkbox>
          <SendButton
            text={create ? 'Guardar' : 'Atrás'}
            onPress={create ? handleSubmit : navigation.goBack}
          />
        </Box>
      </VStackContainer>
    </HideKeyboardOnForms>
  )
}

const titles = {
  create: {
    symptoms: '¿Cuáles síntomas experimentas?',
    feelings: '¿Cómo te sientes?',
    description: 'Describe qué tal ha sido tu día',
  },
  read: {
    symptoms: 'Síntomas experimentados',
    feelings: 'Sentimientos experimentados',
    description: 'Descripción de tu día',
  },
}

export default EntryDetailed
