import React from 'react'
import { Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'

interface sectionHeaderInterface {
  sectionHeaderContent: string
}

export const SectionHeader = (props: sectionHeaderInterface): JSX.Element => {
  return (
    <Text
      alignSelf="center"
      fontSize="28px"
      color={useColorModeValue(
        theme.colors.primary.default,
        theme.colors.primary.light
      )}
      fontWeight="700"
    >
      {props.sectionHeaderContent}
    </Text>
  )
}
