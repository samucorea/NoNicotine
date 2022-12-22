import { Image } from 'native-base'
import React, { FC } from 'react'
import moment from 'moment'
import { DiaryEntry } from '../../../models/DiaryEntry'
import { useNavigation } from '@react-navigation/native'
import { DiaryStackScreens } from '../../../routes/Diary/DiaryNavigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackButton } from '../../../components'

const InformationIcon = require('../../../../assets/information.png')

interface Props {
  entry: DiaryEntry
  // data: any
}

const Entry: FC<Props> = ({ entry }) => {
  const navigation =
    useNavigation<StackNavigationProp<DiaryStackScreens, 'Diary', undefined>>()

  return (
    <StackButton
      title={moment(entry.createdAt).format(
        'ddd, DD [de] MMMM [de] yyyy h:mm A'
      )}
      onPress={() =>
        navigation.navigate('EntryDetailed', {
          entry,
        })
      }
      subTitle={entry.message}
      rightIcon={<Image source={InformationIcon} alt="information_icon" />}
    />
  )
}

export default Entry
