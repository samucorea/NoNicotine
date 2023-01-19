import React from 'react'
import {
  FormControl,
  IFormControlLabelProps,
  ISelectProps,
  Select,
  Text,
  useColorModeValue,
} from 'native-base'
import theme from '../../AppTheme'
import { useField } from 'formik'
import { KeyValue } from '../../sharedTypes'

export interface SelectInputFieldProps {
  label?: string
  labelStyle?: IFormControlLabelProps
  name: string
  options: string[] | KeyValue[]
}

export const SelectInputField = ({
  name,
  label,
  labelStyle,
  options,
  ...props
}: SelectInputFieldProps & ISelectProps): JSX.Element => {
  const [field, meta, helpers] = useField(name)

  return (
    <FormControl isInvalid={meta?.touched && meta?.error !== undefined}>
      {label !== undefined && (
        <FormControl.Label color={'#fff'} bg={'transparent'} {...labelStyle}>
          <Text color={labelStyle?.color}>{label}</Text>
        </FormControl.Label>
      )}

      <Select
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
        selectedValue={field?.value}
        onClose={() => helpers.setTouched(true)}
        onValueChange={field.onChange(name)}
        {...props}
      >
        {options.map((option, index) => {
          let label = option
          let value = option

          if (typeof option !== 'string') {
            label = option.key
            value = option.value as string
          }

          return (
            <Select.Item
              key={index}
              label={label as string}
              value={value as string}
            />
          )
        })}
      </Select>

      <FormControl.ErrorMessage>{meta?.error}</FormControl.ErrorMessage>
    </FormControl>
  )
}
