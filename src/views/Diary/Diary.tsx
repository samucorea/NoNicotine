import { AddIcon, Divider, Fab, ScrollView, VStack } from 'native-base'
import React, { FC, useState, useEffect } from 'react'
import theme from '../../AppTheme'
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

  const dividerThickness = '1.5'

  return (
    <ScrollView>
      <VStack
        borderColor="#949494"
        borderTopWidth={dividerThickness}
        borderBottomWidth={dividerThickness}
        divider={
          <Divider
            orientation="vertical"
            bg="#949494"
            thickness={dividerThickness}
          />
        }
      >
        {entries.map((entry, index) => (
          <Entry key={index} entry={entry} />
        ))}
      </VStack>
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
    </ScrollView>
  )
}

export default Diary
