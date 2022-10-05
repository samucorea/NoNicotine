import React from 'react'
import { IInputProps, Pressable } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons'
import { InputField } from './PlaceholderInputField'

export const PasswordInputField = (props: IInputProps): JSX.Element => {
  const [Show, setShow] = React.useState(false)

  return (
    <InputField
      type={Show ? 'text' : 'password'}
      InputRightElement={
        <Pressable onPress={() => setShow(!Show)} marginRight="5px">
          <Ionicons name={Show ? 'eye-off' : 'eye'} size={32}></Ionicons>
        </Pressable>
      }
      {...props}
    />
  )
}
