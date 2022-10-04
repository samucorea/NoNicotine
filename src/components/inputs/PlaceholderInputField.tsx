import React from 'react'
import { Input, useColorModeValue } from 'native-base'
import theme from '../../AppTheme'

interface PlaceholderInputFieldInterface {
  PlaceholderContent: string
}

export const PlaceholderInputField = (
  props: PlaceholderInputFieldInterface
): JSX.Element => {
  return (
    <>
      <Input
        marginTop="22px"
        borderRadius="10"
        borderColor={useColorModeValue(
          theme.colors.primary.default,
          theme.colors.primary.light
        )}
        placeholder={props.PlaceholderContent}
        placeholderTextColor={useColorModeValue(
          theme.colors.primary.default,
          theme.colors.primary.light
        )}
        padding="12px"
        fontSize="16px"
      ></Input>
    </>
  )
}
