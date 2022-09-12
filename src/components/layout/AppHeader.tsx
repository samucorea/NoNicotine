import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Text } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  props: NativeStackHeaderProps
}

const AppHeader = ({ props: { navigation, options, route, back } }: Props) => {
  return (
    <SafeAreaView>
      <Text>Header</Text>
    </SafeAreaView>
  )
}

export default AppHeader
