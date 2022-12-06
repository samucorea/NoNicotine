import { Formik } from 'formik'
import { Box, FlatList, IconButton } from 'native-base'
import React from 'react'
import { object, string } from 'yup'
import theme from '../../../AppTheme'
import { InputField } from '../../../components'
import Message from './Message'
import SendIcon from '../../../../assets/send.svg'

export interface MessageText {
  text: string
  sender: 'sent' | 'received'
}

const messages = [
  { text: 'hola', sender: 'sent' },
  { text: 'adiós', sender: 'received' },
  {
    text: 'basiduyfghuiyasfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    sender: 'received',
  },
  { text: 'hola', sender: 'sent' },
]

const Chat = () => {
  return (
    <Box flex={1}>
      <FlatList
        p={5}
        data={messages}
        renderItem={({ item }) => <Message messageText={item as MessageText} />}
      />
      <Box borderTopColor="#949494" borderWidth={1}>
        <Formik
          onSubmit={() => {
            console.log('submitted')
          }}
          initialValues={{ message: '' }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <InputField
              multiline
              name="message"
              borderWidth={0}
              showError={false}
              placeholder="Escribe un mensaje"
              placeholderTextColor="#737373"
              InputRightElement={
                <IconButton
                  onPress={() => handleSubmit}
                  rounded={'full'}
                  bg={theme.colors.primary.default}
                  icon={<SendIcon />}
                  mr={2}
                />
              }
            />
          )}
        </Formik>
      </Box>
    </Box>
  )
}

const validationSchema = object({
  message: string().required(),
})

export default Chat
