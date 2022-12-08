import { ChatMessage } from './ChatMessage'

export interface Conversations {
  [key: string]: ChatMessage[]
}
