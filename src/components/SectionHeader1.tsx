import React from 'react'
import { Text } from 'react-native'
import StyleSheet from '../styles/SectionHeader1'

interface sectionHeaderInterface {
  sectionHeaderContent: string
}

export const SectionHeader = (props: sectionHeaderInterface): JSX.Element => {
  return (
    <Text style={StyleSheet.container} adjustsFontSizeToFit={true}>
      {props.sectionHeaderContent}
    </Text>
  )
}
