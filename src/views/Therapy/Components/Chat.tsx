import { Formik } from 'formik'
import { Box, FlatList, IconButton } from 'native-base'
import React, { useEffect, FC } from 'react'
import { object, string } from 'yup'
import theme from '../../../AppTheme'
import {
  CustomIconButton,
  InputField,
  VStackContainer,
} from '../../../components'
import Message from './Message'
import SendIcon from '../../../../assets/send.svg'
import { ChatMessage, Patient } from '../../../models'
import { useChatHubContext } from '../../../contexts/ChatHubContext'
import { useUserContext } from '../../../contexts/UserContext'
import { Roles } from '../../../utils/enums/Roles'
import ProfileIcon from '../../../../assets/profile.svg'

const messages = [
  { text: 'hola', sender: 'sent' },
  { text: 'adiós', sender: 'received' },
  {
    text: 'basiduyfghuiyasfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    sender: 'received',
  },
  { text: 'hola', sender: 'sent' },
]

const Chat: FC<any> = (props) => {
  const { user, token } = useUserContext()
  const { sendPrivateMessage, subscribe } = useChatHubContext()

  if (user?.role == Roles.therapist) {
    props.navigation.setOptions({
      headerRight: () => (
        <CustomIconButton
          icon={ProfileIcon}
          pr={'5'}
          onPress={() =>
            props.navigation.navigate('PreviewProfile', {
              user: props.route.params.user,
            })
          }
        />
      ),
    })
  }

  return (
    <VStackContainer scroll={false}>
      <FlatList
        p={5}
        data={messages}
        renderItem={({ item }) => <Message messageText={item as ChatMessage} />}
      />
      <Box borderTopColor="#949494" borderWidth={1}>
        <Formik
          onSubmit={({ message }) => {
            const sendToId =
              user?.role == Roles.patient
                ? (user as Patient).therapist?.identityUserId
                : props.route.params.user.identityUserId

            console.log(
              'patientId',
              user?.role == Roles.patient,
              sendToId,
              user.therapist?.identityUserId
            )

            console.log('sender', user?.identityUserId)

            console.log('🚀 ~ file: Chat.tsx:60 ~ sendToId', sendToId)

            sendPrivateMessage(sendToId as string, message)

            // if (user?.role == Roles.patient) {
            //   const patient = user as Patient
            //   console.log('sending')

            //   sendPrivateMessage(
            //     patient.therapist?.identityUserId as string,
            //     message
            //   )
            // } else if (user?.role == Roles.therapist) {
            //   // const patient = props.user as Patient
            //   // sendPrivateMessage(patient.identityUserId, message)
            // }
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
                  onPress={() => handleSubmit()}
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
    </VStackContainer>
  )
}

const validationSchema = object({
  message: string().required(),
})

export default Chat
