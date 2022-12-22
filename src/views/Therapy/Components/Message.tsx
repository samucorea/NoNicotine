import { Box, Text } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import React, { FC } from 'react'
import theme from '../../../AppTheme'
import { ChatMessage } from '../../../models'

interface Props {
  messageText: ChatMessage
}

const Message: FC<Props> = ({ messageText: { sender, text } }) => {
  const messageStyle: InterfaceBoxProps =
    sender == 'sent'
      ? { alignSelf: 'flex-end', bg: theme.colors.message.sent }
      : { alignSelf: 'flex-start', bg: theme.colors.message.received }

  return (
    <Box {...messageStyle} mb={2} p={2} borderRadius="5px" maxWidth="85%">
      <Text color="#fff">{text}</Text>
    </Box>
  )
}

export default Message
