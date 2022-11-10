import { BaseEntity } from './BaseEntity'

export default interface Habit extends BaseEntity {
  title: string
  days: string[]
  time: Date
}
