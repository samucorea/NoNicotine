import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  FC,
  useContext,
} from 'react'
import { Conversations } from '../models/Conversations'
import { chatService } from '../services/chatService'
import { useUserContext } from './UserContext'

interface ChatHubContextProps {
  subscribe: (userId: string) => void
  ackMessage: (messageId: string) => void
  sendPrivateMessage: (userId: string, message: string) => void
  conversations: Conversations
}

interface Message {
  id: string
  content: string
  senderId: string
}

const ChatHubContext = createContext<ChatHubContextProps | undefined>(undefined)

export const useChatHubContext = () => {
  return useContext(ChatHubContext)!
}

interface Props {
  children: ReactNode
}
const ChatHubProvider: FC<Props> = ({ children }) => {
  const { token, user } = useUserContext()

  const [connection, setConnection] = useState<HubConnection>()
  const [conversations, setConversations] = useState<Conversations>({})

  useEffect(() => {
    const startConnection = async () => {
      const connectionTMP = new HubConnectionBuilder()
        .withUrl(`${process.env.SERVER_HOST}/Chat`, {
          accessTokenFactory: () => token!,
        })
        .withAutomaticReconnect()
        .build()

      const conversationStorage = await chatService.getConversations()
      setConversations(conversationStorage)

      connectionTMP.on('ReceiveMessage', async (message: Message) => {
        console.log('signalr meessage', message)
        if (!user || !user.identityUserId) {
          console.error('no user found in context when message was recieved')
          return
        }

        const newConversations = await chatService.saveMessage(
          message.senderId,
          {
            sender: 'reciever',
            date: new Date(),
            text: message.content,
          }
        )
        setConversations(newConversations)

        ackMessage(message.id)
      })

      connectionTMP.start()

      setConnection(connectionTMP)
    }

    startConnection()
  }, [])

  const subscribe = (userId: string) => {
    console.log('subscrib to', userId)
    connection?.send('Subscribe', userId)
  }

  const ackMessage = (messageId: string) => {
    connection?.send('AckMessage', messageId)
  }

  const sendPrivateMessage = async (userId: string, message: string) => {
    console.log('connection state', connection?.state)

    connection?.send('SendPrivateMessage', userId, message)

    const newConversations = await chatService.saveMessage(userId, {
      sender: 'sent',
      date: new Date(),
      text: message,
    })
    setConversations(newConversations)
  }

  return (
    <ChatHubContext.Provider
      value={{ subscribe, ackMessage, sendPrivateMessage, conversations }}
    >
      {children}
    </ChatHubContext.Provider>
  )
}

export default ChatHubProvider
