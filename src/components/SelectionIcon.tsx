import React from 'react'
import { Pressable, Image } from 'native-base'
import { Dimensions } from 'react-native'

interface SelectionIconInterface {
  SelectionIconContent: string
}

export const SelectionIcon = (props: SelectionIconInterface): JSX.Element => {
  const windowHeight = Dimensions.get('window').height

  return (
    <Pressable>
      <Image
        source={require(props.SelectionIconContent)}
        width={windowHeight / 5.12}
        height={windowHeight / 5.12}
      />
    </Pressable>
  )
}
