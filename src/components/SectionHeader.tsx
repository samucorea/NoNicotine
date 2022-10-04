import React from 'react'
import { Text, useColorModeValue } from 'native-base'
import theme from '../AppTheme'

interface sectionHeaderInterface {
  sectionHeaderContent: string
  sectionHeaderFontSize?: number
}

export const SectionHeader = (props: sectionHeaderInterface): JSX.Element => {
  return (
    <Text
      alignSelf="center"
      fontSize={props.sectionHeaderFontSize}
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
