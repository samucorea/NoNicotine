import React, { FC } from 'react'
import {
  Radio,
  useColorModeValue,
  FormControl,
  IFormControlLabelProps,
} from 'native-base'
import theme from '../AppTheme'
import { useField } from 'formik'
import { KeyValue, Sex } from '../sharedTypes'
import { IRadioProps } from 'native-base/lib/typescript/components/primitives/Radio/types'

interface Props {
  value?: Sex | ''
  name: string
  label?: string
  labelStyle?: IFormControlLabelProps
  direction?: 'row' | 'column'
  options: string[] | KeyValue[]
  optionStyle?: IRadioProps
  isDisabled?: boolean
}

export const RadioInput: FC<Props> = ({
  value,
  name,
  label,
  direction = 'row',
  options,
  labelStyle,
  optionStyle,
  isDisabled = false,
}) => {
  const colors = useColorModeValue(
    theme.colors.primary.default,
    theme.colors.primary.light
  )

  const [field, meta] = useField(name)

  return (
    <FormControl isInvalid={meta.error !== undefined}>
      <FormControl.Label {...labelStyle}>{label}</FormControl.Label>

      <Radio.Group
        value={field.value.toString()}
        onChange={field.onChange(name)}
        name="RadioInputGroup"
        alignSelf="flex-start"
        display="flex"
        flexDirection={direction}
      >
        {options.map((option, index) => (
          <Radio
            isDisabled={isDisabled}
            key={index}
            m={2}
            borderColor={theme.colors.primary.default}
            {...optionStyle}
            value={typeof option == 'string' ? option : option.value.toString()}
            _text={{ color: colors, ...optionStyle?._text }}
          >
            {typeof option == 'string' ? option : option.key}
          </Radio>
        ))}
      </Radio.Group>
      <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
    </FormControl>
  )
}
