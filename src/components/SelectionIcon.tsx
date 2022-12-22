import React from 'react'
import { Pressable, IPressableProps } from 'native-base'
import { SvgProps } from 'react-native-svg'

interface Props {
  icon: React.FC<SvgProps>
}

export const CustomIconButton = (
  props: Props & IPressableProps
): JSX.Element => {
  const { icon, ...pressableProps } = props

  return (
    <Pressable {...pressableProps} alignItems="center">
      <props.icon />
    </Pressable>
  )
}
