import { Box, Checkbox, Text, TextArea } from 'native-base'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const titles = {
    create: {
      symptoms: t('diary.entryDetailed.onCreate.symptoms')!,
      feelings: t('diary.entryDetailed.onCreate.feelings')!,
      description: t('diary.entryDetailed.onCreate.description')!,
    },
    read: {
      symptoms: t('diary.entryDetailed.onRead.symptoms')!,
      feelings: t('diary.entryDetailed.onRead.feelings')!,
      description: t('diary.entryDetailed.onRead.description')!,
    },
  }

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    entry
      ? typeof entry.symptoms == 'string'
        ? entry.symptoms.split(',')
        : entry.symptoms
      : []
  )
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>(
    entry
      ? typeof entry.feelings == 'string'
        ? entry.feelings.split(',')
        : entry.feelings
      : []
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

      try {
        diaryEntryService.create(entryTMP)
      } catch (error: any) {
        console.log(
          '🚀 ~ file: EntryDetailed.tsx:63 ~ handleSubmit ~ error',
          error.response.data
        )
      }

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
            placeholder={t('diary.entryDetailed.descriptionPlaceholder')!}
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
            {t('diary.entryDetailed.share')!}
          </Checkbox>
          <SendButton
            text={
              create
                ? t('diary.entryDetailed.sendButton.save')!
                : t('diary.entryDetailed.sendButton.back')!
            }
            onPress={create ? handleSubmit : navigation.goBack}
          />
        </Box>
      </VStackContainer>
    </HideKeyboardOnForms>
  )
}

export default EntryDetailed
