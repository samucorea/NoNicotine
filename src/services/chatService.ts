import AsyncStorage from '@react-native-async-storage/async-storage'
import { ChatMessage, Conversations } from '../models'

export default class ChatService {
  private readonly conversationsKey = 'conversations'

  async getConversations() {
    const response = await AsyncStorage.getItem(this.conversationsKey)

    if (!response) {
      const newConversations: Conversations = {}
      AsyncStorage.setItem(
        this.conversationsKey,
        JSON.stringify(newConversations)
      )

      return newConversations
    }

    return JSON.parse(response) as Conversations
  }

  async saveMessage(userId: string, message: ChatMessage) {
    if (userId === '') {
      throw new Error('Must specify userId to save chat message to')
    }
    const conversations = await this.getConversations()

    if (!conversations[userId]) {
      conversations[userId] = []
    }

    if (message.sender === '' || message.text === '') {
      throw new Error('must specify message and sender id to save chat message')
    }

    conversations[userId].push(message)

    await AsyncStorage.setItem(
      this.conversationsKey,
      JSON.stringify(conversations)
    )

    return conversations
  }
}

export const chatService = new ChatService()
