import React from 'react'
import { Text } from 'react-native'
import StyleSheet from '../styles/RegularText1'

interface RegularTextInterface {
  RegularTextContent: string
}

export const RegularText = (props: RegularTextInterface): JSX.Element => {
  return <Text style={StyleSheet.textContent}>{props.RegularTextContent}</Text>
}
