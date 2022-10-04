import React from 'react'
import { Input, Pressable, useColorModeValue } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons'
import theme from '../AppTheme'

interface PasswordInputFieldInterface {
  PlaceholderContent: string
}

export const PasswordInputField = (
  props: PasswordInputFieldInterface
): JSX.Element => {
  const [Show, setShow] = React.useState(false)

  return (
    <>
      <Input
        type={Show ? 'text' : 'password'}
        InputRightElement={
          <Pressable onPress={() => setShow(!Show)} marginRight="5px">
            <Ionicons name={Show ? 'eye' : 'eye-off'} size={32}></Ionicons>
          </Pressable>
        }
        marginTop="22px"
        borderRadius="10"
        borderColor={useColorModeValue(
          theme.colors.primary.default,
          theme.colors.primary.light
        )}
        padding="12px"
        placeholder={props.PlaceholderContent}
        placeholderTextColor={useColorModeValue(
          theme.colors.primary.default,
          theme.colors.primary.light
        )}
        fontSize="16px"
      ></Input>
    </>
  )
}
