import React from 'react'
import { Pressable, Text } from 'react-native'
import StyleSheet from '../styles/SendButton'

interface buttonInterface {
  buttonContent: string
}

export const SendButton = (props: buttonInterface): JSX.Element => {
  return (
    <Pressable style={StyleSheet.container}>
      <Text style={StyleSheet.buttonText}>{props.buttonContent}</Text>
    </Pressable>
  )
}
