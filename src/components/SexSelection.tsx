import React from 'react'
import { Text, Radio, useColorModeValue } from 'native-base'
import theme from '../AppTheme'

export const SexSelection = (): JSX.Element => {
  const colors = useColorModeValue(
    theme.colors.primary.default,
    theme.colors.primary.light
  )

  const [Sex, setSex] = React.useState('')

  return (
    <>
      <Text alignSelf="baseline" color={colors} fontSize="16px">
        Sexo
      </Text>
      <Radio.Group
        name="SexSelectionGroup"
        value={Sex}
        onChange={(nextValue) => {
          setSex(nextValue)
        }}
        alignSelf="flex-start"
        display="flex"
        flexDirection="row"
      >
        <Radio value="M" my="1">
          <Text color={colors} fontSize="16px" marginRight="22px">
            M
          </Text>
        </Radio>
        <Radio value="F" my="1">
          <Text color={colors} fontSize="16px">
            F
          </Text>
        </Radio>
      </Radio.Group>
    </>
  )
}
