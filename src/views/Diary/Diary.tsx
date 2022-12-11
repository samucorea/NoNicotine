import { AddIcon, Fab, Text } from 'native-base'
import React, { FC, useState, useEffect } from 'react'
import theme from '../../AppTheme'
import { Loading, VStackContainer } from '../../components'
import { useFocus } from '../../hooks'
import { DiaryEntry } from '../../models/DiaryEntry'
import { DiaryScreenProps } from '../../routes/Diary/DiaryNavigator'
import diaryEntryService from '../../services/diaryEntryService'
import therapistService from '../../services/therapistService'
import Entry from './Components/Entry'

const Diary: FC<DiaryScreenProps<'Diary'>> = ({
  navigation,
  route: {
    params: { patientId },
  },
}) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const isFocused = useFocus(navigation)

  useEffect(() => {
    const getData = async () => {
      const service = patientId
        ? async () => await therapistService.getPatientsEntries(patientId)
        : async () => await diaryEntryService.getAll()

      const response = await service()

      setEntries(response.data)
      setLoading(false)
    }

    if (isFocused) {
      getData()
    }
  }, [isFocused])

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

      {isFocused && !patientId && (
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
