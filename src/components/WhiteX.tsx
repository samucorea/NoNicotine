import React from 'react'
import { Pressable, Image } from 'react-native'
import StyleSheet from '../styles/WhiteX'

export const WhiteX = (): JSX.Element => {
  return (
    <Pressable style={StyleSheet.container}>
      <Image source={require('../../assets/WhiteX.png')} />
    </Pressable>
  )
}
