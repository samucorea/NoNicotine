import { Box, Divider, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import { DiaryEntry } from '../../models/DiaryEntry'
import Entry from './Components/Entry'

const Diary = () => {
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
    </ScrollView>
  )
}

export default Diary
