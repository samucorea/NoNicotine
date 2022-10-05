import React from 'react'
import {
  FormControl,
  IFormControlLabelProps,
  Input,
  Text,
  useColorModeValue,
} from 'native-base'
import theme from '../../AppTheme'
import { IInputProps } from 'native-base/lib/typescript/components/primitives/Input/types'

export interface InputFieldProps {
  label?: string
  labelStyle?: IFormControlLabelProps
}

export const InputField = ({
  label,
  labelStyle,
  ...props
}: InputFieldProps & IInputProps): JSX.Element => {
  return (
    <FormControl w="100%" bg={'transparent'}>
      {label !== undefined && (
        <FormControl.Label color={'#fff'} bg={'transparent'} {...labelStyle}>
          <Text color={labelStyle?.color}>{label}</Text>
        </FormControl.Label>
      )}

      <Input
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
        {...props}
      />
    </FormControl>
  )
}
