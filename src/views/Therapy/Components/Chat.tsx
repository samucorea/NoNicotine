import { Formik } from 'formik'
import { Box, FlatList, IconButton } from 'native-base'
import React, { useEffect, FC, useState } from 'react'
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
import { chatService } from '../../../services/chatService'

// let messages: ChatMessage[] = []

const Chat: FC<any> = (props) => {
  const { user } = useUserContext()
  const { sendPrivateMessage, subscribe, conversations } = useChatHubContext()
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const getSenderId = (): string | null => {
    if (user?.role === Roles.patient) {
      const patient = user as Patient
      if (!patient.therapist?.identityUserId) {
        return null
      }
      return patient.therapist?.identityUserId
    } else if (user?.role === Roles.therapist) {
      const patient = props.route.params.user as Patient
      if (!patient.identityUserId) {
        return null
      }

      return patient.identityUserId
    }

    return null
  }
  const senderId = getSenderId()
  if (!senderId) {
    console.error('no sender id was found')
  }

  useEffect(() => {
    const subscribeId =
      user?.role == Roles.patient
        ? (user as Patient).therapist?.id
        : props.route.params.user.id
    subscribe(subscribeId)
  }, [])

  useEffect(() => {
    const getMessages = async () => {
      if (!user || !user?.identityUserId) {
        return
      }

      if (!senderId) {
        throw new Error('no sender id was found in chat')
      }

      if (user?.role === Roles.patient) {
        const patient = user as Patient
        if (!patient.therapist?.identityUserId) {
          return
        }

        setMessages(conversations[senderId])
      } else if (user?.role === Roles.therapist) {
        const patient = props.route.params.user as Patient
        if (!patient.identityUserId) {
          return
        }
        setMessages(conversations[senderId])
      }
    }

    getMessages()
  }, [conversations])

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
        data={messages}
        paddingRight={5}
        paddingLeft={5}
        renderItem={({ item }) => <Message messageText={item as ChatMessage} />}
      />
      <Box borderTopColor="#949494" borderWidth={1}>
        <Formik
          onSubmit={async ({ message }, { resetForm }) => {
            console.log(user?.role)
            if (user?.role == Roles.patient) {
              console.log('sending')

              sendPrivateMessage(senderId!, message)
            } else if (user?.role == Roles.therapist) {
              sendPrivateMessage(senderId!, message)
            }
            resetForm()
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
