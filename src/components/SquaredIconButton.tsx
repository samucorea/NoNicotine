import { Box, Image, Pressable, Text } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import { InterfaceImageProps } from 'native-base/lib/typescript/components/primitives/Image/types'
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'
import React, { FC, ReactNode } from 'react'
import { ImageSourcePropType } from 'react-native'

interface Props {
  icon: ImageSourcePropType
  iconProps?: InterfaceImageProps & Partial<{}>
  label: string
  labelStyle?: InterfaceTextProps
  subLabel?: ReactNode
  topRigthButton?: ReactNode
  onPress?: () => void
}

const SquaredIconButton: FC<Props & InterfaceBoxProps & Partial<{}>> = ({
  icon,
  label,
  subLabel,
  topRigthButton,
  labelStyle,
  onPress,
  iconProps,
  ...props
}) => {
  return (
    <Box
      shadow={9}
      rounded="10px"
      position="relative"
      borderColor={'#fff'}
      borderWidth={2}
      height={'150px'}
      width={'150px'}
      justifyContent="center"
      {...props}
    >
      <Pressable
        borderColor={'transparent'}
        onPress={onPress}
        alignContent={'center'}
        alignItems="center"
        borderWidth={'3'}
        justifyContent={'space-evenly'}
      >
        {topRigthButton !== undefined && (
          <Box position="absolute">{topRigthButton}</Box>
        )}
        <Image source={icon} alt="icon" {...iconProps} />
        <Text fontSize={'lg'} {...labelStyle}>
          {label}
        </Text>
        {subLabel !== undefined && subLabel}
      </Pressable>
    </Box>
  )
}

export default SquaredIconButton
