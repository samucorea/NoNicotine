import React from 'react'
import { Pressable, IPressableProps } from 'native-base'

interface Props {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
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
