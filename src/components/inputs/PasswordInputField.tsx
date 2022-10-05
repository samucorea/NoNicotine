import React from 'react'
import { IInputProps, Pressable } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons'
import { InputField, InputFieldProps } from './InputField'
import theme from '../../AppTheme'

export const PasswordInputField = (
  props: IInputProps & InputFieldProps
): JSX.Element => {
  const [Show, setShow] = React.useState(false)

  return (
    <InputField
      type={Show ? 'text' : 'password'}
      InputRightElement={
        <Pressable onPress={() => setShow(!Show)} marginRight="5px">
          <Ionicons
            color={theme.colors.primary.light}
            name={Show ? 'eye-off' : 'eye'}
            size={32}
          ></Ionicons>
        </Pressable>
      }
      {...props}
    />
  )
}
