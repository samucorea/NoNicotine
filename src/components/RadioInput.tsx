import React, { FC } from 'react'
import {
  Text,
  Radio,
  useColorModeValue,
  FormControl,
  IFormControlLabelProps,
} from 'native-base'
import theme from '../AppTheme'
import { useField } from 'formik'
import { KeyValue, Sex } from '../sharedTypes'
import {
  IRadioComponentType,
  IRadioProps,
} from 'native-base/lib/typescript/components/primitives/Radio/types'

interface Props {
  value?: Sex | ''
  name: string
  label?: string
  labelStyle?: IFormControlLabelProps
  direction?: 'row' | 'column'
  options: string[] | KeyValue[]
  optionStyle?: IRadioProps
}

export const RadioInput: FC<Props> = ({
  value,
  name,
  label,
  direction = 'row',
  options,
  labelStyle,
  optionStyle,
}) => {
  const colors = useColorModeValue(
    theme.colors.primary.default,
    theme.colors.primary.light
  )

  const [field, meta, helpers] = useField(name)

  return (
    <FormControl isInvalid={meta.error !== undefined}>
      <FormControl.Label {...labelStyle}>{label}</FormControl.Label>

      <Radio.Group
        value={field.value}
        onChange={field.onChange(name)}
        name="RadioInputGroup"
        alignSelf="flex-start"
        display="flex"
        flexDirection={direction}
      >
        {options.map((option, index) => (
          <Radio
            key={index}
            m={2}
            borderColor={theme.colors.primary.default}
            {...optionStyle}
            value={typeof option == 'string' ? option : option.value}
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
