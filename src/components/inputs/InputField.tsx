import React, { FC } from 'react'
import {
  FormControl,
  IFormControlLabelProps,
  Input,
  Pressable,
  useColorModeValue,
} from 'native-base'
import theme from '../../AppTheme'
import { useField } from 'formik'
import { IInputProps } from 'native-base/lib/typescript/components/primitives/Input/types'
import Ionicons from '@expo/vector-icons/Ionicons'

export interface InputFieldProps {
  label?: string
  labelStyle?: IFormControlLabelProps
  password?: boolean
  name: string
  showError?: boolean
  textArea?: boolean
}

export const InputField: FC<InputFieldProps & IInputProps> = ({
  name,
  label,
  labelStyle,
  password = false,
  showError = true,
  textArea = false,
  ...props
}) => {
  const [Show, setShow] = React.useState(false)

  const [field, meta, helpers] = useField(name)

  return (
    <FormControl
      bg="transparent"
      isInvalid={meta?.touched && meta?.error !== undefined}
    >
      {label !== undefined && (
        <FormControl.Label color={'#fff'} bg={'transparent'} {...labelStyle}>
          {label}
        </FormControl.Label>
      )}

      <Input
        onBlur={() => helpers.setTouched(true)}
        w="100%"
        borderRadius="10"
        borderColor={useColorModeValue(
          theme.colors.primary.default,
          theme.colors.primary.light
        )}
        placeholderTextColor={useColorModeValue(
          theme.colors.primary.default,
          theme.colors.primary.light
        )}
        padding="12px"
        fontSize="16px"
        _focus={{ bg: props.bg }}
        type={password ? (Show ? 'text' : 'password') : 'text'}
        InputRightElement={
          password ? (
            <Pressable onPress={() => setShow(!Show)} marginRight="5px">
              <Ionicons
                color={theme.colors.primary.light}
                name={Show ? 'eye-off' : 'eye'}
                size={32}
              ></Ionicons>
            </Pressable>
          ) : undefined
        }
        value={field?.value?.toString()}
        onChangeText={field?.onChange(name)}
        {...props}
      />
      {showError && (
        <FormControl.ErrorMessage
          _stack={{ bg: 'transparent' }}
          bg="transparent"
          mt={0}
          mb={2}
          _text={{ fontSize: 'md' }}
        >
          {meta?.error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  )
}
