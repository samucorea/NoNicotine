import { Box, Text } from 'native-base'
import React, { FC } from 'react'
import { DiaryScreenProps } from '../../routes/Diary/DiaryNavigator'

const EntryDetailed: FC<DiaryScreenProps<'EntryDetailed'>> = ({
  route: {
    params: { entryId },
  },
}) => {
  return (
    <Box>
      <Text>EntryDetailed</Text>
    </Box>
  )
}

export default EntryDetailed
