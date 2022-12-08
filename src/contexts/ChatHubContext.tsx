import { HubConnectionBuilder } from '@microsoft/signalr'
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

const ChatHubContext = createContext<ChatHubContextProps | undefined>(undefined)

export const useChatHubContext = () => {
  return useContext(ChatHubContext)!
}

interface Props {
  children: ReactNode
}
const ChatHubProvider: FC<Props> = ({ children }) => {
  const { token } = useUserContext()

  const [connection, setConnection] = useState(
    new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${process.env.SERVER_HOST}/Chat?access_token=${token!}`)
      .build()
  )

  useEffect(() => {
    const startConnection = async () => {
      connection.on('ReceiveMessage', (message: string) => {
        console.log('signalr meessage', message)
      })

      connection.start()
    }

    startConnection()
  }, [])

  const subscribe = (userId: string) => {
    connection.send('Subscribe', userId)
  }

  const ackMessage = (messageId: string) => {
    connection.send('AckMessage', messageId)
  }

  const sendPrivateMessage = (userId: string, message: string) => {
    connection.send('SendPrivateMessage', userId, message)
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