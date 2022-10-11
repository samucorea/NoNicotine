import { AddIcon, Fab } from 'native-base'
import React, { FC, useState, useEffect } from 'react'
import theme from '../../AppTheme'
import { VStackContainer } from '../../components'
import { DiaryEntry } from '../../models/DiaryEntry'
import { DiaryScreenProps } from '../../routes/Diary/DiaryNavigator'
import Entry from './Components/Entry'

const Diary: FC<DiaryScreenProps<'Diary'>> = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    navigation.addListener('focus', () => setIsFocused(true))
    navigation.addListener('blur', () => setIsFocused(false))
  }, [])

  const entries: DiaryEntry[] = [
    {
      id: 1,
      date: new Date(),
      description: 'hasiudofhoasduifhsadiuofh suihasdiu hfosaiud hfiusah d',
      symptoms: ['tragedia', 'desgracia'],
    },
    {
      id: 1,
      date: new Date(),
      description: 'hasiudofhoasduifhsadiuofh suihasdiu hfosaiud hfiusah d',
      symptoms: ['tragedia', 'desgracia'],
    },
    {
      id: 1,
      date: new Date(),
      description: 'hasiudofhoasduifhsadiuofh suihasdiu hfosaiud hfiusah d',
      symptoms: ['tragedia', 'desgracia'],
    },
  ]

  return (
    <>
      <VStackContainer>
        {entries.map((entry, index) => (
          <Entry key={index} entry={entry} />
        ))}
      </VStackContainer>

      {isFocused && (
        <Fab
          onPress={() =>
            navigation.navigate('EntryDetailed', { entryId: undefined })
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
