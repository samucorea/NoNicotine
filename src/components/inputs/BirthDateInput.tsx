import React, { FC } from 'react'
import {
  Text,
  Input,
  useColorModeValue,
  VStack,
  HStack,
  FormControl,
  Pressable,
} from 'native-base'
import theme from '../../AppTheme'
import { useField } from 'formik'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import moment from 'moment'

interface Props {
  name: string
  isDisabled?: boolean
}

export const BirthDateInput: FC<Props> = ({ name, isDisabled = false }) => {
  const [field, meta, helpers] = useField(name)

  const colors = useColorModeValue('#94a4ba', theme.colors.primary.light)

  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: field.value,
      onChange: (e, date) => {
        helpers.setValue(date)
        helpers.setTouched(true)
      },
    })
  }

  const date = moment(field.value)
  return (
    <FormControl
      isReadOnly
      isDisabled={isDisabled}
      isInvalid={meta.error !== undefined && meta.touched}
    >
      <FormControl.Label isDisabled={isDisabled}>
        <Text
          pl={3}
          pb={1}
          color={theme.colors.primary.default}
          fontSize="16px"
        >
          Fecha de nacimiento
        </Text>
      </FormControl.Label>

      <Pressable onPress={openDatePicker} isDisabled={isDisabled} w="100%">
        <HStack space={2} w="100%">
          <Input
            w="20%"
            value={date.format('D')}
            fontSize={15}
            variant="date"
            borderColor={colors}
            placeholderTextColor={colors}
            placeholder="dd"
            keyboardType="numeric"
          />
          <Input
            w="20%"
            value={date.format('M')}
            fontSize={15}
            variant="date"
            borderColor={colors}
            placeholderTextColor={colors}
            placeholder="mm"
            keyboardType="numeric"
          />
          <Input
            w="25%"
            value={date.format('yyyy')}
            fontSize={15}
            variant="date"
            borderColor={colors}
            placeholderTextColor={colors}
            placeholder="aaaa"
            keyboardType="numeric"
          />
        </HStack>
      </Pressable>
      <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
    </FormControl>
  )
}
