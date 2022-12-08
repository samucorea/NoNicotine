import AsyncStorage from '@react-native-async-storage/async-storage'
import { Conversations } from '../models'

export default class ChatService {
  private readonly conversationsKey = 'conversations'

  async getConversations() {
    const response = await AsyncStorage.getItem(this.conversationsKey)

    if (response == null) {
      AsyncStorage.setItem(this.conversationsKey, JSON.stringify({}))
      return {}
    }

    return JSON.parse(response) as Conversations
  }
}

export const chatService = new ChatService()
