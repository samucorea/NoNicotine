import { Box, Pressable, Text } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'
import React, { FC, ReactNode } from 'react'
import { SvgProps } from 'react-native-svg'

interface Props {
  Icon: React.FC<SvgProps>
  iconProps?: SvgProps
  label: string
  labelStyle?: InterfaceTextProps
  subLabel?: ReactNode
  topRigthButton?: ReactNode
  onPress?: () => void
}

const SquaredIconButton: FC<Props & InterfaceBoxProps & Partial<{}>> = ({
  Icon,
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
          <Box alignSelf="flex-end">{topRigthButton}</Box>
        )}
        <Icon color="#fff" width={75} height={75} {...iconProps} />
        <Text fontSize={'lg'} {...labelStyle}>
          {label}
        </Text>
        {subLabel !== undefined && subLabel}
      </Pressable>
    </Box>
  )
}

export default SquaredIconButton
