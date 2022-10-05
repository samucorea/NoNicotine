import { Box, Center, Image, Pressable, Text } from 'native-base'
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'
import React, { FC, ReactNode } from 'react'
import { ImageSourcePropType } from 'react-native'

interface Props {
  icon: ImageSourcePropType
  label: string
  labelStyle?: InterfaceTextProps
  subLabel?: ReactNode
  topRigthButton?: ReactNode
}

const SquaredIconButton: FC<Props & InterfacePressableProps & Partial<{}>> = ({
  icon,
  label,
  subLabel,
  topRigthButton,
  labelStyle,
  ...props
}) => {
  return (
    <Pressable
      alignContent={'center'}
      alignItems="center"
      height={'130px'}
      width={'130px'}
      borderColor="#fff"
      borderWidth={'3'}
      {...props}
      position="relative"
      rounded="10px"
      justifyContent={'space-evenly'}
    >
      {topRigthButton !== undefined && (
        <Box position="absolute">{topRigthButton}</Box>
      )}
      <Image source={icon} alt="icon" />
      <Text fontSize={'lg'} {...labelStyle}>
        {label}
      </Text>
      {subLabel !== undefined && subLabel}
    </Pressable>
  )
}

export default SquaredIconButton
