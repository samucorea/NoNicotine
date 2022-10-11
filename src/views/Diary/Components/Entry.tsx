import {
  Box,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import React, { FC } from 'react'
import moment from 'moment'
import { DiaryEntry } from '../../../models/DiaryEntry'
import { useNavigation } from '@react-navigation/native'
import { DiaryStackScreens } from '../../../routes/Diary/DiaryNavigator'
import { StackNavigationProp } from '@react-navigation/stack'

const InformationIcon = require('../../../../assets/information.png')

interface Props {
  entry: DiaryEntry
}

const Entry: FC<Props> = ({ entry }) => {
  const navigation =
    useNavigation<StackNavigationProp<DiaryStackScreens, 'Diary', undefined>>()

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('EntryDetailed', { entryId: entry.id })
      }
    >
      <HStack justifyContent={'space-between'} p={4} alignItems={'center'}>
        <VStack w="87%" space={1}>
          <Text
            fontWeight={'400'}
            textTransform={'capitalize'}
            letterSpacing={0.5}
            fontSize="md"
          >
            {moment(entry.date).format('ddd, DD [de] MMMM [de] yyyy h:mm A')}
          </Text>
          <Text color={'#8f8f8f'} numberOfLines={1}>
            {entry.description}
          </Text>
        </VStack>
        <Image source={InformationIcon} alt="information_icon" />
      </HStack>
    </Pressable>
  )
}

export default Entry
