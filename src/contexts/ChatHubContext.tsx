import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
} from '@microsoft/signalr'
import {
  useState,
  useEffect,
  createContext,
  Children,
  ReactNode,
  FC,
  useContext,
} from 'react'
import { useUserContext } from './UserContext'

interface ChatHubContextProps {
  subscribe: (userId: string) => void
  ackMessage: (messageId: string) => void
  sendPrivateMessage: (userId: string, message: string) => void
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
  const { token } = useUserContext()

  const [connection, setConnection] = useState<HubConnection>()
  const [permanentToken, setPermanentToken] = useState(token)

  useEffect(() => {
    const connectionTMP = new HubConnectionBuilder()
      .withUrl(`${process.env.SERVER_HOST}/Chat`, {
        accessTokenFactory: () => token!,
      })
      .withAutomaticReconnect()
      .build()

    setConnection(connectionTMP)
    setPermanentToken(token)
  }, [token])

  useEffect(() => {
    const startConnection = async () => {
      connection!.on('ReceiveMessage', (message: Message) => {
        console.log('signalr meessage', message)

        ackMessage(message.id)
      })

      connection?.onclose(startConnection)

      console.log('starting')

      connection!.start()
    }

    if (
      connection &&
      (connection.state == HubConnectionState.Disconnected ||
        connection.state == undefined)
    ) {
      startConnection()
    }
  }, [connection, connection?.state])

  const subscribe = (userId: string) => {
    console.log('subscrib to', userId)
    connection?.send('Subscribe', userId)
  }

  const ackMessage = (messageId: string) => {
    connection?.send('AckMessage', messageId)
  }

  const sendPrivateMessage = (userId: string, message: string) => {
    console.log('connection state', connection?.state)

    connection?.invoke('SendPrivateMessage', userId, message)
  }

  return (
    <ChatHubContext.Provider
      value={{ subscribe, ackMessage, sendPrivateMessage }}
    >
      {children}
    </ChatHubContext.Provider>
  )
}

export default ChatHubProvider
