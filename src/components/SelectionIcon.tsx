import React from 'react'
import { Pressable, Image, IPressableProps } from 'native-base'
import { ImageSourcePropType } from 'react-native'

interface Props {
  icon: ImageSourcePropType
}

export const CustomIconButton = (
  props: Props & IPressableProps
): JSX.Element => {
  const { icon, ...pressableProps } = props

  return (
    <Pressable {...pressableProps} width="50%" alignItems="center">
      <Image alt="selectionIcon" source={props.icon} margin="8px" />
    </Pressable>
  )
}
