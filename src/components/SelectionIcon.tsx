import React from 'react'
import { Pressable, Image } from 'native-base'
import { Dimensions, ImageSourcePropType } from 'react-native'

interface SelectionIconInterface {
  SelectionIconContent: ImageSourcePropType
}

export const SelectionIcon = (props: SelectionIconInterface): JSX.Element => {
  const windowHeight = Dimensions.get('window').height

  return (
    <Pressable>
      <Image
        alt="selectionIcon"
        source={props.SelectionIconContent}
        width={windowHeight / 5.12}
        height={windowHeight / 5.12}
      />
    </Pressable>
  )
}
