import { Keyboard } from 'react-native'
import React, { ReactNode, FC } from 'react'
import { Pressable } from 'native-base'

interface Props {
  children: ReactNode
}

const HideKeyboardOnForms: FC<Props> = ({ children }) => {
  return (
    <Pressable flex={1} onPress={Keyboard.dismiss}>
      {children}
    </Pressable>
  )
}

export default HideKeyboardOnForms
