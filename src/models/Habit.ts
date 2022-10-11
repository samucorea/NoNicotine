import { BaseEntity } from './BaseEntity'

interface Habit extends BaseEntity {
  title: string
  days: string[]
  time: Date
}
