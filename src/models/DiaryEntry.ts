import { BaseEntity } from './BaseEntity'

export interface DiaryEntry extends BaseEntity {
  date: Date
  description: string
  symptoms: string[]
}
