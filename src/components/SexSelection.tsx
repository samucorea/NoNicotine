import React, { FC } from 'react'
import { Text, Radio, useColorModeValue, FormControl } from 'native-base'
import theme from '../AppTheme'
import { useField } from 'formik'
import { Sex } from '../sharedTypes'

interface Props {
  value?: Sex | ''
  name: string
}

export const SexSelection: FC<Props> = ({ value, name }) => {
  const colors = useColorModeValue(
    theme.colors.primary.default,
    theme.colors.primary.light
  )

  const [field, meta, helpers] = useField(name)

  return (
    <FormControl isInvalid={meta.error !== undefined}>
      <FormControl.Label>
        <Text alignSelf="baseline" color={colors} fontSize="16px">
          Sexo
        </Text>
      </FormControl.Label>

      <Radio.Group
        value={field.value}
        onChange={field.onChange(name)}
        name="SexSelectionGroup"
        alignSelf="flex-start"
        display="flex"
        flexDirection="row"
      >
        <Radio value="M" my="1" borderColor={theme.colors.primary.default}>
          <Text color={colors} fontSize="16px" marginRight="22px">
            M
          </Text>
        </Radio>
        <Radio value="F" my="1" borderColor={theme.colors.primary.default}>
          <Text color={colors} fontSize="16px">
            F
          </Text>
        </Radio>
      </Radio.Group>
      <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
    </FormControl>
  )
}
