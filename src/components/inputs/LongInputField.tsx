import React from 'react'
import { Text, TextInput } from 'react-native'
import StyleSheet from '../styles/LongInputField'

interface LongInputFieldInterface {
  LongInputFieldTitle: string
}

export const LongInputField = (props: LongInputFieldInterface): JSX.Element => {
  return (
    <>
      <Text style={StyleSheet.inputTitle}>{props.LongInputFieldTitle}</Text>
      <TextInput style={StyleSheet.container}></TextInput>
    </>
  )
}
