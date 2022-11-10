import { AddIcon, Fab, Text } from 'native-base'
import React, { FC, useState, useEffect } from 'react'
import theme from '../../AppTheme'
import { Loading, VStackContainer } from '../../components'
import { DiaryEntry } from '../../models/DiaryEntry'
import { DiaryScreenProps } from '../../routes/Diary/DiaryNavigator'
import diaryEntryService from '../../services/diaryEntryService'
import Entry from './Components/Entry'

const Diary: FC<DiaryScreenProps<'Diary'>> = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const response = await diaryEntryService.getAll()

      setEntries(response.data)
      setLoading(false)
    }

    getData()
    navigation.addListener('focus', () => {
      setIsFocused(true)
      getData()
    })
    navigation.addListener('blur', () => setIsFocused(false))
  }, [])

  if (loading) {
    return null
  }
  return (
    <>
      <VStackContainer>
        {entries.length == 0 ? (
          <Text textAlign={'center'} color={theme.colors.primary.default}>
            Aun no tiene entradas
          </Text>
        ) : (
          entries.map((entry, index) => <Entry key={index} entry={entry} />)
        )}
      </VStackContainer>

      {isFocused && (
        <Fab
          onPress={() =>
            navigation.navigate('EntryDetailed', { entry: undefined })
          }
          bg={theme.colors.primary.default}
          icon={<AddIcon size="5" bg={theme.colors.primary.default} />}
          bottom={90}
        />
      )}
    </>
  )
}

export default Diary
